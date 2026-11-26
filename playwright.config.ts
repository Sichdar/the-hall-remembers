// The browser check (docs/08, section 9): the built game opens in a real browser at three phone sizes with no errors,
// and the P-WORK loop runs. `npm run browser-check` builds first. On this PC it uses the installed Chrome; on GitHub
// it uses the Chromium that the publish job installs.
import { defineConfig } from "@playwright/test";

const ci = !!process.env.CI;

export default defineConfig({
  testDir: "browser-check",
  outputDir: "browser-check/results",
  timeout: 90_000,
  retries: ci ? 1 : 0,
  workers: 1,
  reporter: ci ? "list" : [["list"]],
  use: {
    baseURL: "http://localhost:4173/",
    ...(ci ? {} : { channel: "chrome" }),
    // WebGL without a graphics card: the browser draws in software, slower but the same picture
    launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] },
  },
  webServer: {
    command: "node node_modules/vite/bin/vite.js preview --port 4173 --strictPort",
    url: "http://localhost:4173/",
    reuseExistingServer: !ci,
    timeout: 60_000,
  },
});
