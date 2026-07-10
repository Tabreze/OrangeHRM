import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';

test('Verify Admin user can login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login();
});
