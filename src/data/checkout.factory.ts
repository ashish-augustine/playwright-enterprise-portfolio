import { faker } from '@faker-js/faker';

export interface CheckoutDetails {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutDataFactory {
  public static createRandomCustomer(): CheckoutDetails {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
  }

  public static createStaticCustomer(override?: Partial<CheckoutDetails>): CheckoutDetails {
    return {
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '90210',
      ...override,
    };
  }
}
