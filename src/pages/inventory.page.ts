import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  public readonly productSortDropdown: Locator;
  public readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.productSortDropdown = page.locator('.product_sort_container');
    this.inventoryItems = page.locator('.inventory_item');
  }

  public async sortBy(optionValue: string): Promise<void> {
    await this.productSortDropdown.selectOption(optionValue);
  }
}
