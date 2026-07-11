import { Page, expect } from '@playwright/test';

export class DeleteEmployeePage {

    constructor(private page: Page) {}

    async goto() {
    await this.page.getByRole('link', { name: 'PIM', exact: true }).click();
    await this.page.waitForLoadState('networkidle');
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

    async deleteEmployee(employeeName: string) {

    const employeeRow = this.page
        .locator('.oxd-table-card, [role="row"]')
        .filter({ hasText: employeeName })
        .first();

    await expect(employeeRow).toBeVisible();

    // Select employee
    await employeeRow.locator('.oxd-checkbox-input').click();

    // Click Delete Selected
    await this.page.getByRole('button', {
        name: /Delete Selected/i
    }).click();

    // Confirm deletion
    await this.page.getByRole('button', {
        name: /Yes,\s*Delete/i
    }).click();

        // Verify success message
        const toast = this.page.getByText('Successfully Deleted', { exact: false });
        await expect(toast).toContainText('Successfully Deleted');

        console.log('Employee deleted successfully:', await toast.textContent());
        

       
    }

}