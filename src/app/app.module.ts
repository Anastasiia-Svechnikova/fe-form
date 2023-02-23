import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { AsyncValidatorDirective } from './form/async-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    AsyncValidatorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
