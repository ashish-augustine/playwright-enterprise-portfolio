import { test, expect } from '../../src/fixtures/base.fixture';
import { CheckoutDataFactory } from '../../src/data/checkout.factory';

test.describe('SauceDemo End-to-End Checkout Flow', () => {
  test('should complete full checkout and calculate totals correctly', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    header,
  }) => {
    // 1. Add items to cart
    await inventoryPage.navigateTo('/inventory.html');
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    expect(await header.getCartItemCount()).toBe(2);

    // 2. Navigate to Cart and proceed to checkout
    await header.openCart();
    await expect(cartPage.cartItems).toHaveCount(2);
    await cartPage.proceedToCheckout();

    // 3. Fill Shipping Info using dynamic Faker data
    const customer = CheckoutDataFactory.createRandomCustomer();
    await checkoutPage.fillCheckoutInfo(customer.firstName, customer.lastName, customer.postalCode);

    // 4. Verify Financial Calculations
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();

    expect(subtotal).toBeGreaterThan(0);
    expect(tax).toBeGreaterThan(0);

    // Validate Subtotal + Tax = Total (handling JavaScript floating point precision)
    expect(Math.abs(subtotal + tax - total)).toBeLessThan(0.01);

    // 5. Finish Checkout and Verify Success Message
    await checkoutPage.finishCheckout();
    const successMessage = await checkoutPage.getCompleteHeaderText();
    expect(successMessage).toBe('Thank you for your order!');
  });
});
