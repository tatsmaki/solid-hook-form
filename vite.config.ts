import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: "tsconfig.build.json",
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: "src/main.ts",
      name: "solid-hook-form",
      fileName: "main",
    },
  },
});
