import { test, expect } from '../../src/fixtures/base.fixture';
import { USER_PERSONAS } from '../../src/data/personas.data';
import { env } from '../../src/config/env.config';

test.describe('SauceDemo Authentication & Persona Matrix', () => {
  test('should successfully login with standard user credentials', async ({ page, loginPage }) => {
    await page.context().clearCookies();
    await loginPage.navigateTo('/');
    await loginPage.login(USER_PERSONAS.STANDARD.username, env.PASSWORD);
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('should display locked out error message for locked_out_user', async ({
    page,
    loginPage,
  }) => {
    await page.context().clearCookies();
    await loginPage.navigateTo('/');
    await loginPage.login(USER_PERSONAS.LOCKED_OUT.username, env.PASSWORD);
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  });

  test('should successfully login with performance glitch user', async ({ page, loginPage }) => {
    await page.context().clearCookies();
    await loginPage.navigateTo('/');
    await loginPage.login(USER_PERSONAS.PERFORMANCE_GLITCH.username, env.PASSWORD);
    await expect(page).toHaveURL(/.*inventory\.html/, { timeout: 10000 });
  });

  test('should logout successfully via sidebar menu', async ({
    page,
    inventoryPage,
    header,
    sidebar,
  }) => {
    // Uses pre-authenticated storageState fixture
    await inventoryPage.navigateTo('/inventory.html');
    await expect(header.pageTitle).toHaveText('Products');

    await sidebar.logout();
    await expect(page).toHaveURL('/');
  });
});
