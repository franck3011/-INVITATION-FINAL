import { Mp3Encoder } from "@breezystack/lamejs";

export interface CompressAudioOptions {
  /**
   * Target bitrate in kbps (e.g. 64, 80, 96, 128).
   * If omitted, an adaptive bitrate is calculated so that the output stays well under 2 MB.
   */
  targetBitrateKbps?: number;
  /**
   * Maximum audio duration in seconds (default: 240s = 4 minutes).
   * Invitation music loops, so 3 to 4 minutes is ample.
   */
  maxDurationSeconds?: number;
  /**
   * Sample rate in Hz (default: 44100).
   */
  sampleRate?: number;
  /**
   * Number of channels (1 for mono, 2 for stereo).
   * Default: 1 (mono). Mono cuts file size by half with indistinguishable quality on phones.
   */
  channels?: 1 | 2;
  /**
   * Progress callback (0 - 100%).
   */
  onProgress?: (percent: number, statusText: string) => void;
}

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  savedPercent: number;
  duration: number;
  bitrateKbps: number;
}

/**
 * Format bytes to human readable format (e.g. "1.4 Mo", "850 Ko")
 */
export function formatAudioSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
  }
  return `${Math.round(bytes / 1024)} Ko`;
}

/**
 * Compress an audio File (MP3, WAV, AAC, M4A, OGG) directly in the browser
 * using Web Audio API + LAME MP3 Encoder.
 */
export async function compressAudioFile(
  file: File,
  options: CompressAudioOptions = {},
): Promise<CompressionResult> {
  const {
    maxDurationSeconds = 240,
    sampleRate = 44100,
    channels = 1,
    onProgress,
  } = options;

  if (typeof window === "undefined") {
    throw new Error("La compression audio s'exécute uniquement dans le navigateur.");
  }

  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) {
    throw new Error("L'API Web Audio n'est pas supportée par votre navigateur.");
  }

  onProgress?.(5, "Lecture du fichier audio…");
  const arrayBuffer = await file.arrayBuffer();

  onProgress?.(15, "Décodage audio…");
  const audioCtx = new AudioCtx();
  let decodedBuffer: AudioBuffer;
  try {
    decodedBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  } catch (err) {
    console.error("Échec du décodage audio:", err);
    throw new Error(
      "Impossible de décoder ce fichier audio. Assurez-vous qu'il s'agit d'un format MP3, WAV, AAC ou OGG valide.",
    );
  } finally {
    try {
      await audioCtx.close();
    } catch {
      // ignore
    }
  }

  const originalDuration = decodedBuffer.duration;
  const targetDuration = Math.min(originalDuration, maxDurationSeconds);
  const targetSamplesCount = Math.ceil(targetDuration * sampleRate);

  onProgress?.(25, "Rééchantillonnage & optimisation…");
  const OfflineAudioCtx =
    window.OfflineAudioContext ||
    (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext })
      .webkitOfflineAudioContext;

  const offlineCtx = new OfflineAudioCtx(channels, targetSamplesCount, sampleRate);
  const source = offlineCtx.createBufferSource();
  source.buffer = decodedBuffer;
  source.connect(offlineCtx.destination);
  source.start(0);

  const renderedBuffer = await offlineCtx.startRendering();

  // Convert Float32Array to 16-bit PCM Int16Array
  const leftFloat = renderedBuffer.getChannelData(0);
  const left16 = new Int16Array(leftFloat.length);
  for (let i = 0; i < leftFloat.length; i++) {
    const s = Math.max(-1, Math.min(1, leftFloat[i]));
    left16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }

  let right16: Int16Array | null = null;
  if (channels === 2 && renderedBuffer.numberOfChannels > 1) {
    const rightFloat = renderedBuffer.getChannelData(1);
    right16 = new Int16Array(rightFloat.length);
    for (let i = 0; i < rightFloat.length; i++) {
      const s = Math.max(-1, Math.min(1, rightFloat[i]));
      right16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
  }

  // Calculate adaptive bitrate:
  // We want to ensure total size <= 1.8 Mo (even for long tracks)
  let bitrate = options.targetBitrateKbps;
  if (!bitrate) {
    if (targetDuration > 180) {
      bitrate = 64;
    } else if (targetDuration > 90) {
      bitrate = 80;
    } else {
      bitrate = 96;
    }
  }

  onProgress?.(35, `Encodage MP3 (${bitrate} kbps)…`);
  const encoder = new Mp3Encoder(channels, sampleRate, bitrate);
  const sampleBlockSize = 1152;
  const mp3Chunks: Uint8Array[] = [];
  const totalSamples = left16.length;
  const totalBlocks = Math.ceil(totalSamples / sampleBlockSize);

  let processedBlocks = 0;
  for (let i = 0; i < totalSamples; i += sampleBlockSize) {
    const leftChunk = left16.subarray(i, i + sampleBlockSize);
    let chunk: Uint8Array;
    if (channels === 2 && right16) {
      const rightChunk = right16.subarray(i, i + sampleBlockSize);
      chunk = encoder.encodeBuffer(leftChunk, rightChunk);
    } else {
      chunk = encoder.encodeBuffer(leftChunk);
    }
    if (chunk.length > 0) {
      mp3Chunks.push(chunk);
    }
    processedBlocks++;

    // Yield control periodically to avoid UI freezing
    if (processedBlocks % 50 === 0) {
      const progressPercent = 35 + Math.round((processedBlocks / totalBlocks) * 60);
      onProgress?.(progressPercent, `Compression MP3… ${progressPercent}%`);
      await new Promise((r) => setTimeout(r, 0));
    }
  }

  onProgress?.(96, "Finalisation du fichier MP3…");
  const finalChunk = encoder.flush();
  if (finalChunk.length > 0) {
    mp3Chunks.push(finalChunk);
  }

  const mp3Blob = new Blob(mp3Chunks as unknown as BlobPart[], { type: "audio/mpeg" });
  const baseName = file.name.replace(/\.[^.]+$/, "") || "musique";
  const compressedFile = new File([mp3Blob], `${baseName}.mp3`, {
    type: "audio/mpeg",
    lastModified: Date.now(),
  });

  const originalSize = file.size;
  const compressedSize = compressedFile.size;
  const savedPercent =
    originalSize > 0
      ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100))
      : 0;

  onProgress?.(100, "Compression terminée !");

  return {
    file: compressedFile,
    originalSize,
    compressedSize,
    savedPercent,
    duration: targetDuration,
    bitrateKbps: bitrate,
  };
}
