import { Page, Locator } from '@playwright/test';

export class SidebarComponent {
  private page: Page;
  public readonly menuButton: Locator;
  public readonly logoutLink: Locator;
  public readonly resetAppStateLink: Locator;
  public readonly aboutLink: Locator;
  public readonly closeMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.resetAppStateLink = page.locator('#reset_sidebar_link');
    this.aboutLink = page.locator('#about_sidebar_link');
    this.closeMenuButton = page.locator('#react-burger-cross-btn');
  }

  public async openMenu(): Promise<void> {
    await this.menuButton.click();
    // Wait for animation transition
    await this.logoutLink.waitFor({ state: 'visible' });
  }

  public async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  public async resetAppState(): Promise<void> {
    await this.openMenu();
    await this.resetAppStateLink.click();
  }
}
