import { Page, expect } from '@playwright/test';
import { BasePage } from '../../Common/Utilities/BasePage';

export class DeleteEmployeePage extends BasePage {
    constructor( page: Page) {super(page);
    }

async goto() {
    await this.safeClick(
    this.page.getByRole('link', { name: 'PIM' })
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
    console.log("Delete Selected clicked");

    // Confirm deletion
    await expect(
    this.page.getByText("Are you Sure?")
    ).toBeVisible();

    console.log("Popup displayed");

    await this.page.getByRole('button', {
    name: /Yes,\s*Delete/i
    }).click();

    console.log("Yes Delete clicked");

    // Verify success message
const toast = this.page.getByText('Successfully Deleted', { exact: false });
await expect(toast).toContainText('Successfully Deleted');
console.log('Employee deleted successfully:', await toast.textContent());
        

       
    }

}