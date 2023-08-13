import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
        phoneNumber: ['', Validators.required],
      }),
      step2: this.fb.group({}),
      step3: this.fb.group({}),
    });
  }
}
