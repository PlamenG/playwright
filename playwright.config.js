import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: 'tests',

  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',

  // Run all tests in parallel.
  fullyParallel: true,
  
  // Single test run tme limit in ms
  timeout: 30*1000,

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
    actionTimeout: 5*1000,
    baseURL: 'https://runa.io/',
    apiUrl: '',
    headless: false,
    navigationTimeout: 5*1000,
    // Collect trace when retrying the failed test.
    trace: 'on',
    screenshot: 'on',
  },
  expect:{
    timeout: 5*1000
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1680, height: 1200},
      },
      trace: 'on-failure'
    },
  ],
});