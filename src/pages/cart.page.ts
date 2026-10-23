import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  public readonly cartItems: Locator;
  public readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('#checkout');
  }

  public async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
  }
}
