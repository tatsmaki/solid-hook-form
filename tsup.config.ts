import { solidPlugin } from "esbuild-plugin-solid";
import { defineConfig, type Options } from "tsup";

const config: Options = {
  entry: ["src/main.ts"],
  target: "esnext",
  platform: "browser",
  format: ["esm"],
  clean: true,
  outDir: "dist/",
  treeshake: {
    preset: "smallest"
  },
  replaceNodeEnv: true
};

export default defineConfig([
  {
    ...config,
    dts: false,
    esbuildOptions(options) {
      options.jsx = "preserve";
      options.chunkNames = "[name]/[hash]";
      options.drop = ["console", "debugger"];
    },
    outExtension() {
      return {
        js: ".jsx"
      };
    }
  },
  {
    ...config,
    dts: true,
    esbuildOptions(options) {
      options.chunkNames = "[name]/[hash]";
      options.drop = ["console", "debugger"];
    },
    esbuildPlugins: [solidPlugin({ solid: { generate: "dom" } })]
  }
]);
