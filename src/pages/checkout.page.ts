import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  public readonly firstNameInput: Locator;
  public readonly lastNameInput: Locator;
  public readonly postalCodeInput: Locator;
  public readonly continueButton: Locator;
  public readonly finishButton: Locator;
  public readonly completeHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.completeHeader = page.locator('.complete-header');
  }

  public async fillShippingInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillText(this.firstNameInput, firstName);
    await this.fillText(this.lastNameInput, lastName);
    await this.fillText(this.postalCodeInput, postalCode);
    await this.clickElement(this.continueButton);
  }
}
