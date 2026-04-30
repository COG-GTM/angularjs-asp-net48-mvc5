import { devices } from '@playwright/test';

const config = {
  testDir: './e2e/tests',
  testMatch: /.e2e.js/,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:5000/',
    video: 'on',
    trace: 'on',
    headless: true,
    browserName: 'chromium',
  },
  outputDir: 'test-results/',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    command: 'dotnet run --project ModernApp.csproj --urls http://localhost:5000',
    port: 5000,
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
};

export default config;
