import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);
@NgModule({
  declarations: [AppComponent, Step1Component, Step2Component, Step3Component],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
