import type {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { registerDecorator, ValidatorConstraint } from 'class-validator';

export function Match(
  property: string,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const relatedPropertyName = args.constraints[0];
    const relatedValue = (args.object as any)[relatedPropertyName];
    if (relatedValue === undefined) {
      throw new Error(
        `Property ${relatedPropertyName} is not defined in the object.`,
      );
    }
    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments): string {
    const constraints = args.constraints[0];
    return `Property ${String(args.property)} must match property ${String(
      constraints,
    )}`;
  }
}
