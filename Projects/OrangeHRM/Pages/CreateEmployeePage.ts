import { Page, expect } from '@playwright/test';

export class CreateEmployeePage {

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList'
        );
    }

    async addEmployee(firstName: string, lastName: string) {

        // Click Add button
        await this.page.getByRole('button', { name: ' Add' }).click();

        // Verify Add Employee page
        await expect(
            this.page.getByRole('textbox', { name: 'First Name' })
        ).toBeVisible();

        // Fill employee details
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(firstName);

        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);

        // Click Save
        await this.page.getByRole('button', { name: 'Save' }).click();
    

        // Verify success message
    const toast = this.page.locator('.oxd-toast').last();;

    await expect(toast).toBeVisible({
    timeout: 10000
    });
    
    await expect(toast).toContainText('Successfully Saved');
    const message = await toast.textContent();

    console.log(message);

    expect(message).toContain('Successfully Saved');
    }   
}