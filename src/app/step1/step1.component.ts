import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormDataService } from 'src/services/form-data.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService
  ) {}

  ngOnInit(): void {
    this.form = this.formDataService.formData.get('step1') as FormGroup;
  }
}
