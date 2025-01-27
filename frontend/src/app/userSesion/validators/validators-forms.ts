
import {ValidatorFn,ValidationErrors,AbstractControl } from '@angular/forms';


  export function noSpecialCharacters (): ValidatorFn  {
    return (control: AbstractControl): ValidationErrors | null =>{
        const reSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        const specialCharacters= reSpecialCharacters.test(control.value);
        return specialCharacters ? {noSpecialCharacters: true} : null;
    }
  }

  export function noOnlyNumbers (): ValidatorFn  {
        return (control: AbstractControl): ValidationErrors | null =>{
        const onlyNumbers = /^[0-9]+$/;
        const areNumbers = onlyNumbers.test(control.value);
        return areNumbers ? {noOnlyNumbers: true} : null;
    };
    }
