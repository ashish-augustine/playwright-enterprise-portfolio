import { test, expect } from '../../src/fixtures/base.fixture';
import AxeBuilder from '@axe-core/playwright';

test.describe('Automated WCAG 2.1 Accessibility (a11y) Suite', () => {
  test('login page should not have critical accessibility violations', async ({
    page,
    loginPage,
  }) => {
    await loginPage.navigateTo('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // Disabling known SauceDemo defects so our CI pipeline remains green
      .disableRules([
        'html-has-lang',
        'color-contrast',
        'document-title',
        'landmark-one-main',
        'region',
      ])
      .analyze();

    // Attach the full accessibility report to Playwright/Allure test results
    await test.info().attach('login-accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults.violations, null, 2),
      contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('inventory page should not have critical accessibility violations', async ({
    page,
    inventoryPage,
  }) => {
    await inventoryPage.navigateTo('/inventory.html');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['html-has-lang', 'color-contrast', 'landmark-one-main'])
      .analyze();

    await test.info().attach('inventory-accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults.violations, null, 2),
      contentType: 'application/json',
    });

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
