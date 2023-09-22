// filtro.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private filterFormSubject: BehaviorSubject<FormGroup>;

  constructor(private formBuilder: FormBuilder) {
    this.filterFormSubject = new BehaviorSubject<FormGroup>(
      this.formBuilder.group({
        type: '',
        generation: ''
      })
    );
  }

  get filterForm() {
    return this.filterFormSubject.value;
  }

  setFilterForm(formGroup: FormGroup) {
    this.filterFormSubject.next(formGroup);
  }
}
