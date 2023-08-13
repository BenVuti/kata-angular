import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from 'src/models/person.model';
import { Project } from 'src/models/project.model';
import { FormDataService } from 'src/services/form-data.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component implements OnInit {
  person!: Person;
  project!: Project;
  projectPrice: number = 0;
  effyFundingAmount: number = 0;

  constructor(
    private formDataService: FormDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.formDataService.formData.get('step1')?.valid) {
      this.router.navigate(['/step1']);
      return;
    }
    if (!this.formDataService.formData.get('step2')?.valid) {
      this.router.navigate(['/step2']);
      return;
    }

    this.person = this.formDataService.getPesron();
    this.project = this.formDataService.getProject();

    this.computeProjectValues();
  }

  computeProjectValues() {
    this.projectPrice = this.project.propertySize * 80;
    this.effyFundingAmount =
      this.projectPrice * 0.75 -
      (this.project.householdIncome / this.project.householdSize) * 0.15;
  }
}
