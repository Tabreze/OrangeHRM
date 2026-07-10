import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { CreateEmployeePage } from '../Pages/CreateEmployeePage';
import { DeleteEmployeePage } from '../Pages/DeleteEmployeePage';

test('Verify Admin can delete an existing employee', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const createEmployee = new CreateEmployeePage(page);
  const deleteEmployee = new DeleteEmployeePage(page);

  const uniqueSuffix = Date.now().toString().slice(-4);
  const firstName = `Peter${uniqueSuffix}`;
  const lastName = 'Smith';

  await loginPage.goto();
  await loginPage.login();
  await createEmployee.goto();
  await createEmployee.addEmployee(firstName, lastName);
  await deleteEmployee.goto();
  await deleteEmployee.searchEmployee(`${firstName} ${lastName}`);
  await deleteEmployee.deleteEmployee(`${firstName} ${lastName}`);
});
  