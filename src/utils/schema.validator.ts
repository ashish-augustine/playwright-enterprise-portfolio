import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

export const validateSchema = (schema: object, data: unknown): void => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) {
    throw new Error(`Schema validation errors: ${ajv.errorsText(validate.errors)}`);
  }
};
