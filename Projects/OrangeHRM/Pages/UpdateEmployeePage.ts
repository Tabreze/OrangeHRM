import { Page, expect } from '@playwright/test';

export class UpdateEmployeePage {
    constructor(private page: Page) {}

    async goto() {
    await this.page.getByRole('link', { name: 'PIM', exact: true }).click();
    await this.page.waitForLoadState('networkidle');
}

    async searchEmployee(employeeName: string) {
        const hintsInput = this.page.getByRole('textbox', { name: 'Type for hints...' }).first();

        await hintsInput.fill(employeeName);
        await this.page.getByRole('listbox').getByText(employeeName, { exact: false }).first().click();
        await this.page.getByRole('button', { name: 'Search' }).click();

        await expect(this.page.locator('.oxd-table-body')).toBeVisible();
    }

    async updateEmployee(employeeName: string) {
        const employeeRow = this.page.getByRole('row', { name: employeeName });
        const nationalityField = this.page.locator('.oxd-input-group').filter({ hasText: 'Nationality' });
        const maritalField = this.page.locator('.oxd-input-group').filter({ hasText: 'Marital Status' });
        const genderField = this.page.locator('.oxd-input-group').filter({ hasText: 'Gender' });
        const dobField = this.page.locator('.oxd-input-group').filter({ hasText: 'Date of Birth' });

        // 1. Open employee record by clicking the name link
        await expect(employeeRow).toBeVisible();
        await employeeRow.getByText(employeeName, { exact: false }).first().click();

        // 2. Wait for Personal Details page to load
        await expect(
            this.page.getByRole('heading', { name: 'Personal Details', level: 6 })
        ).toBeVisible({ timeout: 20000 });
        await this.page.waitForLoadState('networkidle');

        // 3. Nationality
        await nationalityField.locator('.oxd-select-text').click();
        await this.page.getByRole('listbox').getByText('Indian', { exact: true }).click();

        // 4. Marital Status
        await maritalField.locator('.oxd-select-text').click();
        await this.page.getByRole('listbox').getByText('Married', { exact: true }).click();

        // 5. Gender (Male)
        await genderField.getByText('Male', { exact: true }).locator('..').locator('.oxd-radio-input').click();

        // 6. Date of Birth
        await dobField.locator('.oxd-date-input').click();
        await this.page.getByText('2026', { exact: true }).click();
        await this.page.getByText('1970', { exact: true }).click();
        await this.page.getByText('5', { exact: true }).click();

        // 7. Save
        await this.page.locator('form').filter({ hasText: 'Employee Full Name' })
            .getByRole('button', { name: 'Save' }).click();

        // 8. Verify success toast
        const toast = this.page.locator('.oxd-toast-content-text').first();
        await expect(
            this.page.getByText(/Successfully Updated/i)
        ).toBeVisible();

        console.log('Employee updated successfully');
        }   
}