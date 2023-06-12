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
  ] as any,
  build: {
    emptyOutDir: true,
    minify: false,
    manifest: false,
    sourcemap: false,
  },

  resolve: {
    alias: {
      "mjml-browser": path.resolve("./node_modules/mjml-browser"),
      slate: path.resolve("./node_modules/slate"),
      "slate-react": path.resolve("./node_modules/slate-react"),
      "beacas-plugins/lib/style.css": path.resolve(__dirname, "package.json"), // 防止404 报错

      "beacas-localization": path.resolve(
        __dirname,
        "../packages/beacas-localization"
      ),
      "beacas-core": path.resolve(__dirname, "../packages/beacas-core/src"),
      "beacas-editor": path.resolve(__dirname, "../packages/beacas-editor/src"),
      "beacas-plugins": path.resolve(
        __dirname,
        "../packages/beacas-plugins/src"
      ),
      "@beacas-editor": path.resolve(
        __dirname,
        "../packages/beacas-editor/src"
      ),
      "@beacas-core": path.resolve(__dirname, "../packages/beacas-core/src"),
      "@beacas-plugins": path.resolve(
        __dirname,
        "../packages/beacas-plugins/src"
      ),
      "@": path.resolve("src"),
    },
  },
});
