let lastCapturedError: unknown = undefined;

export function captureError(err: unknown) {
  lastCapturedError = err;
  // eslint-disable-next-line no-console
  console.error("[server-error]", err);
}

export function consumeLastCapturedError(): unknown {
  const e = lastCapturedError;
  lastCapturedError = undefined;
  return e;
}

type GlobalWithListener = {
  addEventListener?: (type: string, cb: (event: unknown) => void) => void;
};
const g = globalThis as GlobalWithListener;
try {
  g.addEventListener?.("unhandledrejection", (event) => {
    captureError((event as { reason?: unknown })?.reason);
  });
  g.addEventListener?.("error", (event) => {
    const e = event as { error?: unknown; message?: string };
    captureError(e?.error ?? e?.message);
  });
} catch {
  // ignore
}
