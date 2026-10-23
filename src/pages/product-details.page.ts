import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailsPage extends BasePage {
  public readonly productName: Locator;
  public readonly productDescription: Locator;
  public readonly productPrice: Locator;
  public readonly addToCartButton: Locator;
  public readonly backToProductsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.inventory_details_name');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('button[data-test^="add-to-cart"]');
    this.backToProductsButton = page.locator('#back-to-products');
  }

  public async getProductNameText(): Promise<string> {
    return await this.getElementText(this.productName);
  }

  public async addProductToCart(): Promise<void> {
    await this.clickElement(this.addToCartButton);
  }

  public async backToInventory(): Promise<void> {
    await this.clickElement(this.backToProductsButton);
  }
}
