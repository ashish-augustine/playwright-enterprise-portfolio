import { test, expect } from '@playwright/test';
import { validateSchema } from '../../src/utils/schema.validator';

// Define the expected JSON Schema for the API response
const userSchema = {
  type: 'object',
  properties: {
    data: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        avatar: { type: 'string' },
      },
      required: ['id', 'email', 'first_name', 'last_name', 'avatar'],
    },
  },
  required: ['data'],
};

test.describe('API Contract & Schema Validation Suite', () => {
  test('should fetch user data and validate json schema contract', async ({ request }) => {
    // Using a stable public API to demonstrate backend test capabilities
    const response = await request.get('https://reqres.in/api/users/2');

    // Assert status code
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    // Validate the response body against our expected JSON Schema
    expect(() => validateSchema(userSchema, responseBody)).not.toThrow();

    // Assert specific data values
    expect(responseBody.data.id).toBe(2);
    expect(responseBody.data.email).toContain('@reqres.in');
  });
});
