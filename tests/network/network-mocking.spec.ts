import { test, expect } from '../../src/fixtures/base.fixture';

test.describe('SauceDemo Network Interception & Chaos Testing', () => {
  test('should load inventory page gracefully when image CDN fails', async ({
    page,
    inventoryPage,
  }) => {
    // Intercept and abort all image requests to simulate CDN outage
    await page.route('**/*.{png,jpg,jpeg}', (route) => route.abort('failed'));

    // Navigate to the inventory page (images will fail to load)
    await inventoryPage.navigateTo('/inventory.html');

    // Verify the page structure and inventory items still render successfully
    const itemsCount = await inventoryPage.inventoryItems.count();
    expect(itemsCount).toBeGreaterThan(0);

    // Verify critical text data is still accessible despite visual failure
    const firstItemName = await inventoryPage.inventoryItemNames.first().textContent();
    expect(firstItemName).toBeTruthy();
    expect(firstItemName?.length).toBeGreaterThan(0);
  });
});
