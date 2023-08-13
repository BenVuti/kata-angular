import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Step1Component } from './step1.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MatSelectModule,
  MatOptionModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

describe('Step1Component', () => {
  let component: Step1Component;
  let fixture: ComponentFixture<Step1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Step1Component],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatFormFieldModule,
      ],
      providers: [FormBuilder],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined form', () => {
    expect(component.form).toBeDefined();
  });

  it('should have required form controls', () => {
    const form = component.form;
    expect(form.get('civility')).toBeTruthy();
    expect(form.get('firstName')).toBeTruthy();
    expect(form.get('lastName')).toBeTruthy();
    expect(form.get('email')).toBeTruthy();
    expect(form.get('phoneNumber')).toBeTruthy();
  });

  it('should validate form fields', () => {
    const form = component.form;
    form.patchValue({
      civility: 'mr',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
    });
    expect(form.valid).toBeTruthy();

    // Test invalid values
    form.patchValue({
      civility: '',
      firstName: '',
      lastName: '',
      email: 'invalidemail',
      phoneNumber: '',
    });
    expect(form.valid).toBeFalsy();
    expect(form.get('email')?.hasError('email')).toBeTruthy();
    expect(form.get('civility')?.hasError('required')).toBeTruthy();
  });

  it('should not submit the form when invalid', () => {
    spyOn(console, 'log');
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    component.form.patchValue({
      civility: '',
      firstName: '',
      lastName: '',
      email: 'invalidemail',
      phoneNumber: '',
    });

    fixture.detectChanges();

    submitButton.click();
    fixture.detectChanges();

    expect(console.log).not.toHaveBeenCalled();
  });

  it('should validate valid phone number formats', () => {
    const phoneNumberControl = component.form.get('phoneNumber');

    phoneNumberControl?.setValue('1234567890');
    expect(phoneNumberControl?.valid)
      .withContext('1234567890')
      .toBeTruthy();

    phoneNumberControl?.setValue('(123) 456-7890');
    expect(phoneNumberControl?.valid)
      .withContext('(123) 456-7890')
      .toBeTruthy();

    phoneNumberControl?.setValue('+33123456789');
    expect(phoneNumberControl?.valid)
      .withContext('+33123456789')
      .toBeTruthy();
  });

  it('should invalidate invalid phone number formats', () => {
    const phoneNumberControl = component.form.get('phoneNumber');

    phoneNumberControl?.setValue('1234'); // Too short
    expect(phoneNumberControl?.valid).toBeFalsy();

    phoneNumberControl?.setValue('123456789012345'); // Too long
    expect(phoneNumberControl?.valid).toBeFalsy();

    phoneNumberControl?.setValue('abc1234567'); // Contains non-digit characters
    expect(phoneNumberControl?.valid).toBeFalsy();
  });

  it('should submit the form when valid', () => {
    spyOn(console, 'log');
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    component.form.patchValue({
      civility: 'mr',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
    });

    fixture.detectChanges();

    submitButton.click();
    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith(
      'Form step 1 submitted:',
      component.form.value
    );
  });
});
