import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataService } from 'src/services/form-data.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
  form!: FormGroup;

  constructor(
    private formDataService: FormDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formDataService.formData.get('step1') as FormGroup;
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log('Form step 1 submitted:', this.form.value);

      this.router.navigate(['/step2']);
    } else {
      // Display validation errors or prevent form submission
    }
  }
}
