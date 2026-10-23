import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('SauceDemo Inventory, Sorting & Cart Persistence', () => {
  test('should display inventory items and correct headers for authenticated user', async ({
    inventoryPage,
    header,
  }) => {
    await inventoryPage.navigateTo('/inventory.html');
    await expect(header.pageTitle).toHaveText('Products');
    const itemsCount = await inventoryPage.inventoryItems.count();
    expect(itemsCount).toBeGreaterThan(0);
  });

  test('should sort products by Name (A to Z) and Name (Z to A)', async ({ inventoryPage }) => {
    await inventoryPage.navigateTo('/inventory.html');

    // Sort A to Z
    await inventoryPage.sortBy('az');
    const namesAz = await inventoryPage.getProductNames();
    const sortedAz = [...namesAz].sort();
    expect(namesAz).toEqual(sortedAz);

    // Sort Z to A
    await inventoryPage.sortBy('za');
    const namesZa = await inventoryPage.getProductNames();
    const sortedZa = [...namesAz].sort().reverse();
    expect(namesZa).toEqual(sortedZa);
  });

  test('should sort products by Price (Low to High) and Price (High to Low)', async ({
    inventoryPage,
  }) => {
    await inventoryPage.navigateTo('/inventory.html');

    // Sort Price Low to High
    await inventoryPage.sortBy('lohi');
    const pricesLohi = await inventoryPage.getProductPrices();
    const sortedLohi = [...pricesLohi].sort((a, b) => a - b);
    expect(pricesLohi).toEqual(sortedLohi);

    // Sort Price High to Low
    await inventoryPage.sortBy('hilo');
    const pricesHilo = await inventoryPage.getProductPrices();
    const sortedHilo = [...pricesLohi].sort((a, b) => b - a);
    expect(pricesHilo).toEqual(sortedHilo);
  });

  test('should persist cart item count and state across navigation', async ({
    inventoryPage,
    cartPage,
    header,
  }) => {
    await inventoryPage.navigateTo('/inventory.html');

    // Add item to cart
    await inventoryPage.addItemToCartByIndex(0);
    expect(await header.getCartItemCount()).toBe(1);

    // Navigate to cart page and verify item exists
    await header.openCart();
    await expect(cartPage.cartItems).toHaveCount(1);

    // Continue shopping and verify badge persists
    await cartPage.continueShopping();
    expect(await header.getCartItemCount()).toBe(1);
  });
});
