import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Run all tests in parallel.
  fullyParallel: true,
  
  // Locator timeout
  timeout: 10000,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 4 : undefined,

  // Reporter to use
  reporter: 'html',

  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: 'https://runa.io/',
    apiUrl: '',

    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      viewport: { width: 1280, height: 860}
    },
  ],
});