import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Step3Component } from './step3.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';

describe('Step3Component', () => {
  let component: Step3Component;
  let fixture: ComponentFixture<Step3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [Step3Component],
      imports: [NoopAnimationsModule],
      providers: [FormBuilder],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(Step3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the thank you message with user data', () => {
    component.person = {
      civility: 'mr',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
    };

    fixture.detectChanges();

    const container = fixture.nativeElement.querySelector('.greeting');
    expect(container.textContent.trim()).toContain('Merci Mr John Doe !');
  });

  it('should display project information if ownershipStatus is owner', () => {
    component.project = {
      ownershipStatus: 'owner',
      householdSize: 3,
      householdIncome: 50000,
      propertySize: 150,
    };
    component.computeProjectValues();

    fixture.detectChanges();

    const projectInfo = fixture.nativeElement.querySelector('.project-price');
    expect(projectInfo.textContent).toContain(
      'Le montant nécessaire à la réalisation de votre projet est de'
    );
  });

  it('should display not eligible message if ownershipStatus is not owner', () => {
    component.project = {
      ownershipStatus: 'tenant',
      householdSize: 3,
      householdIncome: 50000,
      propertySize: 150,
    };

    fixture.detectChanges();

    const notEligibleMessage =
      fixture.nativeElement.querySelector('.project-info');
    expect(notEligibleMessage.textContent).toContain(
      "Vous n'êtes malheureusement pas éligible à notre offre."
    );
  });

  it('should display not eligible message if householdIncome is too high', () => {
    component.project = {
      ownershipStatus: 'owner',
      householdSize: 1,
      householdIncome: 100000,
      propertySize: 10,
    };

    component.computeProjectValues();
    fixture.detectChanges();

    const notEligibleMessage =
      fixture.nativeElement.querySelector('.project-help');
    expect(notEligibleMessage.textContent).toContain(
      'Nous ne pouvons malheureusement pas participer au financement de votre projet.'
    );
  });
});
