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
    form.setValue({
      civility: 'mr',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
    });
    expect(form.valid).toBeTruthy();

    // Test invalid values
    form.setValue({
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

  // the "next" button should be disabled if the form is invalid
  it('should disable the "next" button if the form is invalid', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBeTruthy();
  });
});
