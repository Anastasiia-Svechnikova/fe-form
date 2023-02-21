import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { distinctUntilChanged } from 'rxjs';

import { FormService } from './form.service';
import { transformDate } from './helpers/transformDate';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  feForm: FormGroup;
  feOptions = ['angular', 'react', 'vue'];

  constructor(private fb: FormBuilder, public formService: FormService) {
    // set reactive form with default values and validators
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
    // subscribe for framework control changes
    // enable frameworkVersions control get the selected framework versions
    this.framework.valueChanges.pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.feForm.controls['frameworkVersion'].enable();
        this.formService.getFrameworkVersions(value);
      });
  }

  // provide the form value and reset
  onSubmit(formDirective: FormGroupDirective): void {
    console.log({
      ...this.feForm.value,
      dateOfBirth: transformDate(this.feForm.get('dateOfBirth')?.value),
    });
    formDirective.resetForm();
    this.feForm.reset();
  }

  // add a new control group to the hobbies form array
  onAddHobby(): void {
    (<FormArray>this.feForm.get('hobbies')).push(
      this.fb.group({
        name: ['', Validators.required],
        duration: ['', Validators.required],
      })
    );
  }
  // remove the selected control group from the hobbies form array
  onDeleteHobby(i: number): void {
    (<FormArray>this.feForm.get('hobbies')).removeAt(i);
  }
  get framework(): AbstractControl<string>{
    return (<FormControl>this.feForm.get('framework'))
  }
  get hobbies(): AbstractControl<string>[] {
    return (<FormArray>this.feForm.get('hobbies')).controls;
  }
  get email(): AbstractControl<string>{
    return (<FormControl>this.feForm.get('email'))
  }
}
