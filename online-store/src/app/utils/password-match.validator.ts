import { ValidatorFn } from "@angular/forms";

export function passwordMatchValidator(
    passwordControlName: string,
    confirmPasswordControlName: string,
): ValidatorFn {

    return (control) => {
        const passFormControl = control.get(passwordControlName);
        const confirmPassFormControl = control.get(confirmPasswordControlName);

        const arePasswordsMatching = passFormControl?.value === confirmPassFormControl?.value;

        return arePasswordsMatching ? null : { passwordMatchValidator: true };
    }

}