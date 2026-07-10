import { Page, expect } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    async goto() {
        await this.page.goto(process.env.BASE_URL!);
    }

    async login() {

        await this.page.getByRole('textbox', { name: 'Username' })
            .fill(process.env.ORANGE_USERNAME!);

        await this.page.getByRole('textbox', { name: 'Password' })
            .fill(process.env.ORANGE_PASSWORD!);

        await this.page.getByRole('button', { name: 'Login' }).click();
        if (await this.page.getByText('Invalid credentials').isVisible()) {
    throw new Error('Login failed - Invalid credentials');
}
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL(/dashboard/i);
        timeout: 15000
    }
}