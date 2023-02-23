import { Directive } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { delay, map, Observable, of } from 'rxjs';

@Directive({
  selector: '[appAsyncValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncValidatorDirective,
      multi: true,
    },
  ],
})
export class AsyncValidatorDirective implements AsyncValidator {
  validate(
    control: AbstractControl<string>
  ): Observable<ValidationErrors | null> {
    console.log('first');
    return of(control.value).pipe(
      delay(500),
      map((value: string) =>
        value === 'test@test.test' ? { verifyTest: true } : null
      )
    );
  }
}
