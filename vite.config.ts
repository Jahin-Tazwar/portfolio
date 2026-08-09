import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Honor a harness-assigned PORT (falls back to Vite's default 5173).
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: false,
  },
});
