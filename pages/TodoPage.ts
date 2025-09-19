import { Page, expect } from '@playwright/test';

export class TodoPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/todomvc', { waitUntil: 'domcontentloaded' });
    // H1 can be 'todos' on the demo app. Use role-based heading and regex.
    const h1 = this.page.getByRole('heading', { level: 1 });
    await expect(h1).toHaveText(/todos?/i);
    // Ensure the input is ready before interacting
    await expect(this.page.getByPlaceholder('What needs to be done?')).toBeVisible();
  }

  private input() { return this.page.getByPlaceholder('What needs to be done?'); }
  private items() { return this.page.locator('.todo-list li'); }

  async add(items: string[]) {
    for (const i of items) {
      await this.input().fill(i);
      await this.input().press('Enter');
    }
  }

  async complete(idx = 0) {
    await this.items().nth(idx).locator('.toggle').check();
  }

  async countIs(n: number) {
    await expect(this.items()).toHaveCount(n);
  }
}
