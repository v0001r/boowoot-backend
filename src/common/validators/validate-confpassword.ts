import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator'

@ValidatorConstraint({ name: 'ValidateConfPassword', async: false })
export class ValidateConfPasswordConstraint implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments): Promise<boolean> {

        if ( JSON.parse(JSON.stringify(args.object)).password !== value ) {
            return false
        }

        return true
    }

    defaultMessage(args: ValidationArguments) {
        return 'Passwords are not matching.'
    }
}

export function ValidateConfPassword(
    validationOptions?: ValidationOptions,
) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: ValidateConfPasswordConstraint,
        })
    }
}