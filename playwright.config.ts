import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
const env = process.env.TEST_ENV || 'qa';
dotenv.config({
    path: `.env.${env}`
});
export default defineConfig({
  testDir: './Projects',
  /* Run tests in files in parallel */
  fullyParallel: false,
  workers: 1,
  /* Retry once*/
  retries: 1,
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright']
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true, 
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  launchOptions: {
    slowMo: 1000,           // Wait 1 second between each action
  }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
