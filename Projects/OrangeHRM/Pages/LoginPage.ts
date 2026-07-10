import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto(process.env.BASE_URL!);
    }

    async login() {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(process.env.ORANGE_USERNAME!);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(process.env.ORANGE_PASSWORD!);
        await this.page.getByRole('button', { name: 'Login' }).click();

        // Race: either error appears or dashboard loads
        const errorLocator = this.page.getByText('Invalid credentials');
        const errorVisible = await errorLocator.isVisible({ timeout: 3000 }).catch(() => false);

        if (errorVisible) {
            throw new Error('Login failed - Invalid credentials');
        }

        // Extended timeout for slow login redirects
        await expect(this.page).toHaveURL(/dashboard/i, { timeout: 20000 });
    }
}