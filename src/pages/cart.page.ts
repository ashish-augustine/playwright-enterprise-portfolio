import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  public readonly cartItems: Locator;
  public readonly cartItemNames: Locator;
  public readonly checkoutButton: Locator;
  public readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.checkoutButton = page.locator('#checkout');
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  public async getCartItemNames(): Promise<string[]> {
    return await this.cartItemNames.allTextContents();
  }

  public async removeItemFromCart(productName: string): Promise<void> {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    const removeButton = this.page.locator(`[data-test="remove-${formattedName}"]`);
    await this.clickElement(removeButton);
  }

  public async proceedToCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
  }

  public async continueShopping(): Promise<void> {
    await this.clickElement(this.continueShoppingButton);
  }
}
