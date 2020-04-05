import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ExpenseFormService {
  expenseForm: FormGroup = new FormGroup({
    expensetype: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required, Validators.minLength(8)]),
    comment: new FormControl('')
  });

  constructor() { }

  initializeFormGroup() {
    this.expenseForm.setValue({
      expensetype: '',
      value: '',
      date: '',
      comment: '',
    });
  }
}