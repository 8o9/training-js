import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "npm run server",
    baseURL: "http://localhost:5000",
  },
  use: {
    headless: true,
    baseURL: "http://localhost:5000",
    launchOptions: { ignoreDefaultArgs: ["--disable-extensions"] },
  },
  testDir: ".",
  testMatch: /(.+\.)?spec\.[jt]s/,
  workers: 1,
  maxFailures: 1,
});
