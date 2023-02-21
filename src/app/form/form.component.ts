import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged, Subscription } from 'rxjs';

import { FormService } from './form.service';
import { transformDate } from './helpers/transformDate';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  feForm: FormGroup;
  feOptions = ['angular', 'react', 'vue'];
  frameworkControl$!: Subscription

  constructor(private fb: FormBuilder, public formService: FormService) {
    this.feForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      framework: ['', Validators.required],
      frameworkVersion: [{ value: '', disabled: true }, Validators.required],
      email: [
        '',
        [Validators.required, Validators.email],
        this.formService.asyncValidator,
      ],
      hobbies: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          duration: ['', Validators.required],
        }),
      ]),
    });
  }

  ngOnInit(): void {
   this.frameworkControl$ = this.framework.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.feForm.controls['frameworkVersion'].enable();
        this.formService.getFrameworkVersions(value);
      });
  }
  ngOnDestroy(): void {
     this.frameworkControl$.unsubscribe()
  }

  onSubmit(formDirective: FormGroupDirective): void {
    console.log({
      ...this.feForm.value,
      dateOfBirth: transformDate(this.feForm.get('dateOfBirth')?.value),
    });
    formDirective.resetForm();
    this.feForm.reset();
  }

  onAddHobby(): void {
    (<FormArray>this.feForm.get('hobbies')).push(
      this.fb.group({
        name: ['', Validators.required],
        duration: ['', Validators.required],
      })
    );
  }

  onDeleteHobby(i: number): void {
    (<FormArray>this.feForm.get('hobbies')).removeAt(i);
  }
  get framework(): AbstractControl<string> {
    return <FormControl>this.feForm.get('framework');
  }
  get hobbies(): AbstractControl<string>[] {
    return (<FormArray>this.feForm.get('hobbies')).controls;
  }
  get email(): AbstractControl<string> {
    return <FormControl>this.feForm.get('email');
  }
}
