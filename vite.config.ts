// Configuration Vite adaptée pour un déploiement sur Vercel.
// L'ancien plugin Cloudflare (@cloudflare/vite-plugin) a été remplacé par le
// plugin Nitro, que Vercel utilise nativement pour builder les apps TanStack Start
// (détection zero-config : pas besoin de build command ni d'output directory).
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
    }),
    viteReact(),
    nitro({
      preset: process.env.VERCEL ? "vercel" : undefined,
    }),
  ],
});
