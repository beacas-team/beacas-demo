/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ exportAsDefault: true }),
    monacoEditorPlugin({}),
  ].filter(Boolean) as any,
  build: {
    emptyOutDir: true,
    minify: false,
    manifest: false,
    sourcemap: false,
  },

  resolve: {
    alias: {
      "mjml-browser": path.resolve("./node_modules/mjml-browser"),

      "@": path.resolve("src"),
    },
  },
});
