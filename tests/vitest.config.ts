import { playwright } from "@vitest/browser-playwright";
import solidPlugin from "vite-plugin-solid";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    globals: true,
    environment: "node",
    browser: {
      provider: playwright(),
      enabled: true,
      headless: true,
      instances: [{ browser: "chromium" }]
    }
    // disableConsoleIntercept: true,
  }
});
