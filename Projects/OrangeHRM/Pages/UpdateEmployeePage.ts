import { Page, expect } from '@playwright/test';

export class UpdateEmployeePage {

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList'
        );
    }

    async searchEmployee(employeeName: string) {
        const hintsInput = this.page.getByRole('textbox', {
            name: 'Type for hints...'
        }).first();

        await hintsInput.fill(employeeName);
        await this.page.getByText(employeeName, { exact: false }).first().click();
        await this.page.getByRole('button', { name: /Search/i }).click();

        await expect(
            this.page.locator('.oxd-table-body')
        ).toBeVisible();
    }

    async updateEmployee(employeeName: string) {
        const employeeRow = this.page.locator('.oxd-table-card, [role="row"]').filter({ hasText: employeeName }).first();
        const maritalField = this.page.locator('.oxd-input-group').filter({ hasText: 'Marital Status' });
        const genderField = this.page.locator('.oxd-input-group').filter({ hasText: 'Gender' });
        const dobField = this.page.locator('.oxd-input-group').filter({ hasText: 'Date of Birth' });
                
        await expect(employeeRow).toBeVisible();
        await this.page.locator('.oxd-table-card-cell-checkbox > .oxd-checkbox-wrapper > label > .oxd-checkbox-input > .oxd-icon').click();
        await this.page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();
        await this.page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().click();
        await this.page.getByText('Indian').click();
        await maritalField.locator('.oxd-select-text').click();
        await this.page.getByRole('listbox').getByText('Married', { exact: true }).click();
        await genderField.getByText('Male', { exact: true }).locator('..').locator('.oxd-radio-input').click();
        await this.page.locator('.oxd-radio-input').first().click();
        await dobField.locator('.oxd-date-input').click();
        await this.page.getByText('2026', { exact: true }).click();
        await this.page.getByText('1970').click();
        await this.page.getByText('5', { exact: true }).click();
        await this.page.locator('form').filter({ hasText: 'Employee Full NameEmployee' }).getByRole('button').click();

        await expect(
            this.page.getByText(/Successfully Saved/i)
        ).toBeVisible();

        console.log('Employee updated successfully');
    }
}