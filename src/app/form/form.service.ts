import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { delay, map, Observable, of, Subject } from 'rxjs';

const data: { [key: string]: string[] } = {
  angular: ['1.1.1', '1.2.1', '1.3.3'],
  react: ['2.1.2', '3.2.4', '4.3.1'],
  vue: ['3.3.1', '5.2.1', '5.1.3'],
};

@Injectable({
  providedIn: 'root',
})
export class FormService {
  /**subject stream <string[]> with framework versions  */
  frameworkVersions$ = new Subject<string[]>();

  /** accepts framework name as a string and provides the framework's versions to the frameworkVersions$*/
  getFrameworkVersions(framework: string): void {
    of(data)
      .pipe(map((data) => data[framework]))
      .subscribe((data) => { 
        this.frameworkVersions$.next(data);
      });
  }

/** accepts a form control and returns an observable<null> if the control's value doesn't equal to 'test@test.test'
 * otherwise returns an observable<ValidationErrors> with 'verifyTest' error
 */
  asyncValidator(control: FormControl): Observable<ValidationErrors| null> {
    return of(control.value).pipe(
      delay(500),
      map(value => value === 'test@test.test'? {verifyTest: true}  : null))
  }
}
