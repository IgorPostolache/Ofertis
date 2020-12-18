import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkPasswordStrength(nameRe: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value)
      return null;
    return nameRe.test(control.value) ? null : error;
  };
}
