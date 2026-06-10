import { defineConfig, devices } from '@playwright/test';

const PORT = 51267;
const baseURL = `http://localhost:${PORT}/`;

/**
 * Playwright config for the migrated React app.
 * Mirrors the original repo-root playwright.config.js (Page Object Model, single
 * chromium project) but points at the Vite dev server instead of IIS, and starts
 * it automatically via the `webServer` option.
 */
export default defineConfig({
  testDir: './e2e/tests',
  testMatch: /.e2e.ts/,
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL,
    trace: 'on-first-retry',
    browserName: 'chromium',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
