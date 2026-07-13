import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async safeClick(locator: Locator) {
    for (let attempt = 1; attempt <= 2; attempt++) {

      await locator.click();

      // Give application a moment to navigate/render
      await this.page.waitForTimeout(1500);

      const url = this.page.url();
      const body = (await this.page.locator('body').textContent())?.trim();

      // Blank page detected
      if (url === 'about:blank' || body === '') {
        console.log(`⚠ Blank page detected. Retry ${attempt}`);

        await this.page.reload({ waitUntil: 'domcontentloaded' });
        continue;
      }

      return;
    }

    throw new Error('Application stayed blank after 3 retries.');
  }
}