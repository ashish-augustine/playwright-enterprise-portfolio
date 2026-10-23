import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  public readonly productSortDropdown: Locator;
  public readonly inventoryItems: Locator;
  public readonly inventoryItemNames: Locator;
  public readonly inventoryItemPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.productSortDropdown = page.locator('.product_sort_container');
    this.inventoryItems = page.locator('.inventory_item');
    this.inventoryItemNames = page.locator('.inventory_item_name');
    this.inventoryItemPrices = page.locator('.inventory_item_price');
  }

  public async sortBy(optionValue: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.productSortDropdown.selectOption(optionValue);
  }

  public async addItemToCartByIndex(index: number): Promise<void> {
    const addToCartButtons = this.page.locator('button[data-test^="add-to-cart"]');
    await addToCartButtons.nth(index).click();
  }

  public async addItemToCartByName(productName: string): Promise<void> {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const button = this.page.locator(`[data-test="add-to-cart-${formattedName}"]`);
    await this.clickElement(button);
  }

  public async removeItemFromCartByName(productName: string): Promise<void> {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const button = this.page.locator(`[data-test="remove-${formattedName}"]`);
    await this.clickElement(button);
  }

  public async clickProductTitle(productName: string): Promise<void> {
    const productLink = this.page.locator('.inventory_item_name', { hasText: productName });
    await this.clickElement(productLink);
  }

  public async getProductNames(): Promise<string[]> {
    return await this.inventoryItemNames.allTextContents();
  }

  public async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.inventoryItemPrices.allTextContents();
    return priceTexts.map((text) => parseFloat(text.replace('$', '')));
  }
}
