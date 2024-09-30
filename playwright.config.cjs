import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run server",
    port: 3000,
  },
  use: {
    headless: true,
    launchOptions: { ignoreDefaultArgs: ["--disable-extensions"] },
  },
  testDir: ".",
  testMatch: /(.+\.)?spec\.[jt]s/,
  workers: 1,
  maxFailures: 1,
});
