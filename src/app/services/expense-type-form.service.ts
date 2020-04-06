import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeFormService {

  expenseTypeForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    comment: new FormControl('')
  });

  constructor() { }

  initializeFormGroup() {
    this.expenseTypeForm.setValue({
      id: null,
      name: '',
      comment: '',
    });
  }

  populateForm(row){
    this.expenseTypeForm.setValue({
      id: row.Id,
      name: row.Name,
      comment: row.Comment,
    });
  }
}
