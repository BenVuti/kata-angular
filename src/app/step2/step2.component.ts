import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from 'src/models/person.model';
import { FormDataService } from 'src/services/form-data.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit {
  form!: FormGroup;
  person!: Person;

  constructor(
    private formDataService: FormDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.formDataService.formData.get('step1')?.valid) {
      this.router.navigate(['/step1']);
      return;
    }

    this.person = this.formDataService.getPesron();

    this.form = this.formDataService.formData.get('step2') as FormGroup;
  }

  onNextClick(): void {
    if (this.form.valid) {
      console.log('Form step 2 submitted:', this.form.value);

      this.router.navigate(['/step3']);
    } else {
      // Display validation errors or prevent form submission
    }
  }
}
