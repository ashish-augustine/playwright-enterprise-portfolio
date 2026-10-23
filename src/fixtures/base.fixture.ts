import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { HeaderComponent } from '../components/header.component';
import { SidebarComponent } from '../components/sidebar.component';

// Declare the types of our fixtures
interface MyFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  header: HeaderComponent;
  sidebar: SidebarComponent;
}

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  sidebar: async ({ page }, use) => {
    await use(new SidebarComponent(page));
  },
});

export { expect } from '@playwright/test';
