import { Page, expect } from '@playwright/test';
import { BasePage } from '../../Common/Utilities/BasePage';

export class CreateEmployeePage extends BasePage {
    constructor( page: Page) {super(page);}

async goto() {
    await this.safeClick(
    this.page.getByRole('link', { name: 'PIM' })
       // this.page.getByRole('heading', { name: 'Employee Information' })
        //await this.page.waitForLoadState('networkidle')
    );
}

    async addEmployee(firstName: string, lastName: string) {
        await this.safeClick(
	this.page.getByRole('button', { name: ' Add' }));

        await expect(
            this.page.getByRole('textbox', { name: 'First Name' })
        ).toBeVisible();

        await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);

        // Click Save, handle "Employee Id already exists" if it appears
        const employeeIdField = this.page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).getByRole('textbox');
        const idErrorMessage = this.page.getByText('Employee Id already exists');

        let saved = false;
        let attempts = 0;
        const maxAttempts = 5;

        while (!saved && attempts < maxAttempts) {
            attempts++;
            await this.safeClick(
	        this.page.getByRole('button', { name: 'Save' }));

            // Check if the duplicate-ID error appears within a short window
            const errorVisible = await idErrorMessage
                .isVisible({ timeout: 3000 })
                .catch(() => false);

            if (errorVisible) {
                const newId = Date.now().toString().slice(-4); // generate new unique 4-digit ID
                await employeeIdField.fill(newId);
                console.log(`Employee Id already exists. Retrying with new ID: ${newId}`);
                continue; // retry loop, click Save again
            }

            saved = true; // no error, assume save succeeded
        }

        if (!saved) {
            throw new Error(`Failed to save employee after ${maxAttempts} attempts due to duplicate Employee Id.`);
        }

        
        // Verify success message
  const toast = this.page.getByText('Successfully Saved', { exact: false });
await expect(toast).toContainText('Successfully Saved');

console.log('Employee created successfully:', await toast.textContent());
    }  
}