import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { CreateEmployeePage } from '../Pages/CreateEmployeePage';
test('Verify Admin can create a new employee', async ({ page }) => {
const loginPage = new LoginPage(page);
const createEmployeePage = new CreateEmployeePage(page);
await loginPage.goto();
await loginPage.login();
await createEmployeePage.goto();
await createEmployeePage.addEmployee('Peter', 'Smith');
});