import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { CreateEmployeePage } from '../Pages/CreateEmployeePage';
import { UpdateEmployeePage } from '../Pages/UpdateEmployeePage';
test('Verify Admin can update an existing employee', async ({ page }) => {
  test.setTimeout(120000); // Set test timeout to 2 minutes
  
  // Login to OrangeHRM
  const loginPage = new LoginPage(page);
  const createEmployee = new CreateEmployeePage(page);
  const uniqueSuffix = Date.now().toString().slice(-4);
  const firstName = `Peter${uniqueSuffix}`;
  const lastName = 'Smith';
  await loginPage.goto();
  await loginPage.login();

  // Add new employee record
  await createEmployee.goto();
  await createEmployee.addEmployee(firstName, lastName);
  
  // Navigate to PIM module
  await page.getByRole('link', { name: 'PIM' }).click();
  await page.waitForLoadState('networkidle');
  // Update employee personal details
  const updateEmployee = new UpdateEmployeePage(page);
  await updateEmployee.goto();
  await updateEmployee.searchEmployee(`${firstName} ${lastName}`);
  await updateEmployee.updateEmployee(`${firstName} ${lastName}`);
 
});