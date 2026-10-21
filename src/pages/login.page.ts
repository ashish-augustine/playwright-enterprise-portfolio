import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  public readonly usernameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly loginButton: Locator;
  public readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  public async login(username: string, password: string): Promise<void> {
    await this.fillText(this.usernameInput, username);
    await this.fillText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  public async getErrorMessage(): Promise<string> {
    return await this.getElementText(this.errorMessage);
  }
}
