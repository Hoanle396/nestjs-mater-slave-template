import type { ValidationArguments, ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export function ValidateField(
  allowedFields: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ValidateField',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [allowedFields],
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          if (!value) return true;

          try {
            const fields = JSON.parse(value);
            if (!Array.isArray(fields)) return false;

            const [allowedFields] = args.constraints;

            return fields.every(field => allowedFields.includes(field));
          } catch (e) {
            return false;
          }
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid JSON array containing allowed fields`;
        },
      },
    });
  };
}
