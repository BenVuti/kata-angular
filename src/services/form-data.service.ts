import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      step1: this.fb.group({
        civility: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phoneNumber: ['', Validators.required, phoneNumberValidator],
      }),
      step2: this.fb.group({}),
      step3: this.fb.group({}),
    });
  }
}

function phoneNumberValidator(
  control: AbstractControl
): Observable<{ [key: string]: boolean } | null> {
  const validPattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  if (!control.value) {
    return of(null); // No validation if field is empty
  }

  const cleanedValue = control.value.replace(/\D/g, '').trim();

  return of(cleanedValue).pipe(
    map(value =>
      validPattern.test(value) ? null : { invalidPhoneNumber: true }
    )
  );
}
