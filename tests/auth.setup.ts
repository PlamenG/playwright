import { test as setup, expect } from '@playwright/test';

const authFile = '.auth/ie-user.json';

setup('authenticate', async ({ page, request }) => {
  // Authenticate
  await page.goto('https://kempinski.stage.concilioinsights.com/account/login');
  await page.getByPlaceholder('Email').fill((process.env.IE_USER as string));
  await page.getByPlaceholder('Password').fill(process.env.IE_PASS as string);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('https://kempinski.stage.concilioinsights.com/d/overview');
  // Page is loaded
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
  // Save auth info
  await page.context().storageState({ path: authFile });
});