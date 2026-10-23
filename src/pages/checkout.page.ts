import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  public readonly firstNameInput: Locator;
  public readonly lastNameInput: Locator;
  public readonly postalCodeInput: Locator;
  public readonly continueButton: Locator;
  public readonly finishButton: Locator;
  public readonly cancelButton: Locator;
  public readonly subtotalLabel: Locator;
  public readonly taxLabel: Locator;
  public readonly totalLabel: Locator;
  public readonly completeHeader: Locator;
  public readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
    this.backHomeButton = page.locator('#back-to-products');
  }

  public async fillCheckoutInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.fillText(this.firstNameInput, firstName);
    await this.fillText(this.lastNameInput, lastName);
    await this.fillText(this.postalCodeInput, postalCode);
    await this.clickElement(this.continueButton);
  }

  public async getSubtotal(): Promise<number> {
    const text = await this.getElementText(this.subtotalLabel);
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  public async getTax(): Promise<number> {
    const text = await this.getElementText(this.taxLabel);
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  public async getTotal(): Promise<number> {
    const text = await this.getElementText(this.totalLabel);
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  public async finishCheckout(): Promise<void> {
    await this.clickElement(this.finishButton);
  }

  public async getCompleteHeaderText(): Promise<string> {
    return await this.getElementText(this.completeHeader);
  }
}
