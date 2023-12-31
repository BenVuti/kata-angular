import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Observable, of, map } from 'rxjs';
import { Person } from 'src/models/person.model';
import { Project } from 'src/models/project.model';

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
      step2: this.fb.group({
        ownershipStatus: ['', Validators.required],
        householdSize: ['', [Validators.required, Validators.min(1)]],
        householdIncome: [
          '',
          [Validators.required, Validators.min(10000), Validators.max(100000)],
        ],
        propertySize: ['', [Validators.required, Validators.min(1)]],
      }),
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

  getProject(): Project {
    const step2 = this.formData.get('step2') as FormGroup;
    return {
      ownershipStatus: step2.get('ownershipStatus')?.value,
      householdSize: step2.get('householdSize')?.value,
      householdIncome: step2.get('householdIncome')?.value,
      propertySize: step2.get('propertySize')?.value,
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
