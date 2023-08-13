import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Observable, of, map } from 'rxjs';
import { Person } from 'src/models/person.model';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  formData: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formData = this.fb.group({
      step1: this.fb.group({
        //{civility: 'mr', firstName: 'a', lastName: 'a', email: 'a@a.com', phoneNumber: '0123456789'}
        civility: ['mr', Validators.required],
        firstName: ['a', Validators.required],
        lastName: ['a', Validators.required],
        email: ['a@a.com', [Validators.required, Validators.email]],
        phoneNumber: ['0123456789', Validators.required, phoneNumberValidator],
      }),
      step2: this.fb.group({
        ownershipStatus: ['', Validators.required],
        householdSize: [null, [Validators.required, Validators.min(1)]],
        householdIncome: [
          null,
          [Validators.required, Validators.min(10000), Validators.max(100000)],
        ],
        propertySize: [null, [Validators.required, Validators.min(1)]],
      }),
      step3: this.fb.group({}),
    });
  }

  getPesron(): Person {
    const step1 = this.formData.get('step1') as FormGroup;
    return {
      civility: step1.get('civility')?.value,
      firstName: step1.get('firstName')?.value,
      lastName: step1.get('lastName')?.value,
      email: step1.get('email')?.value,
      phoneNumber: step1.get('phoneNumber')?.value,
    };
  }
}

function phoneNumberValidator(
  control: AbstractControl
): Observable<{ [key: string]: boolean } | null> {
  const validPattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  if (!control.value) {
    return of(null);
  }

  const cleanedValue = control.value.replace(/\D/g, '').trim();

  return of(cleanedValue).pipe(
    map(value =>
      validPattern.test(value) ? null : { invalidPhoneNumber: true }
    )
  );
}
