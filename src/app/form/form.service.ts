import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import {
  delay,
  map,
  Observable,
  of,
  Subject
} from 'rxjs';

const data: { [key: string]: string[] } = {
  angular: ['1.1.1', '1.2.1', '1.3.3'],
  react: ['2.1.2', '3.2.4', '4.3.1'],
  vue: ['3.3.1', '5.2.1', '5.1.3'],
};

@Injectable({
  providedIn: 'root',
})
export class FormService {
  frameworkVersions$ = new Subject<string[]>();

  getFrameworkVersions(framework: string): void {
    of(data)
      .pipe(map((data) => data[framework]))
      .subscribe((data) => {
        this.frameworkVersions$.next(data);
      });
  }

  asyncValidator(control: FormControl): Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(500),
      map((value) => (value === 'test@test.test' ? { verifyTest: true } : null))
    );
  }
}
