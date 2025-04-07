import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    solidPlugin(),
    dts({
      tsconfigPath: "tsconfig.build.json",
    }),
  ],
  build: {
    sourcemap: false,
    lib: {
      entry: "src/main.ts",
      name: "solid-hook-form",
      fileName: "main",
    },
    rollupOptions: {
      external: ["solid-js"],
      output: {
        exports: "named",
        globals: {
          "solid-js": "solid",
        },
      },
    },
  },
});
