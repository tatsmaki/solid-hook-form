import { defineConfig } from "vitest/config";
import solidPlugin from "vite-plugin-solid";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    globals: true,
    environment: "node",
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
});
