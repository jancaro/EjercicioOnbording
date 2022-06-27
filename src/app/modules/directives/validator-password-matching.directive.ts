import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[appValidatorPasswordMatching]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidatorPasswordMatchingDirective, multi: true}]
})
export class ValidatorPasswordMatchingDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {

    return passwordMatchingValidator(control);
  }
}

export const passwordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value ? { passwordNotMatch: true } : null;
};
