import { Page, Locator } from '@playwright/test';

export class HeaderComponent {
  private page: Page;
  public readonly shoppingCartBadge: Locator;
  public readonly shoppingCartLink: Locator;
  public readonly menuButton: Locator;
  public readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.pageTitle = page.locator('.title');
  }

  public async getCartItemCount(): Promise<number> {
    if (await this.shoppingCartBadge.isVisible()) {
      const text = await this.shoppingCartBadge.textContent();
      return text ? parseInt(text, 10) : 0;
    }
    return 0;
  }

  public async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }

  public async getTitleText(): Promise<string> {
    return (await this.pageTitle.textContent()) || '';
  }
}
