import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MatSelectModule,
  MatOptionModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import { Step2Component } from './step2.component';
import { MockFormDataService } from 'src/services/mocks/mock-form-data.service';
import { FormDataService } from 'src/services/form-data.service';

describe('Step2Component', () => {
  let component: Step2Component;
  let fixture: ComponentFixture<Step2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Step2Component],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        MatInputModule,
        MatFormFieldModule,
      ],
      providers: [
        FormBuilder,
        { provide: FormDataService, useClass: MockFormDataService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined form', () => {
    expect(component.form).toBeDefined();
  });

  it('should create the form with required fields', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.controls['ownershipStatus']).toBeTruthy();
    expect(component.form.controls['householdSize']).toBeTruthy();
    expect(component.form.controls['householdIncome']).toBeTruthy();
    expect(component.form.controls['propertySize']).toBeTruthy();
  });

  it('should validate the form fields are required', () => {
    const form = component.form;
    form.setValue({
      ownershipStatus: '',
      householdSize: null,
      householdIncome: null,
      propertySize: null,
    });
    expect(form.valid).toBeFalsy();
    expect(form.controls['ownershipStatus'].valid).toBeFalsy();
    expect(form.controls['householdSize'].valid).toBeFalsy();
    expect(form.controls['householdIncome'].valid).toBeFalsy();
    expect(form.controls['propertySize'].valid).toBeFalsy();
  });

  it('should submit the form when valid', () => {
    spyOn(console, 'log');
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    component.form.patchValue({
      ownershipStatus: 'owner',
      householdSize: 3,
      householdIncome: 50000,
      propertySize: 150,
    });

    fixture.detectChanges();

    submitButton.click();
    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith(
      'Form step 2 submitted:',
      component.form.value
    );
  });

  it('should not submit the form when invalid', () => {
    spyOn(console, 'log');
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    component.form.patchValue({
      ownershipStatus: '',
      householdSize: 0,
      householdIncome: 200000,
      propertySize: -10,
    });

    fixture.detectChanges();

    submitButton.click();
    fixture.detectChanges();

    expect(console.log).not.toHaveBeenCalled();
  });
});
