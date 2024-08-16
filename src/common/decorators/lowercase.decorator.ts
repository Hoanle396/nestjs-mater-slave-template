import type { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export function Lowercase(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'Lowercase',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value.toLowerCase();
        },
      },
    });
  };
}
