import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseTypesService } from '../services/expense-types.service';
import { ExpenseType } from '../ExpenseType';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  expenseForm: FormGroup;
  submitted = false;
  expenseTypes: ExpenseType[] = [];

  constructor(private formBuilder: FormBuilder, private expenseTypesService: ExpenseTypesService) { 
    expenseTypesService.getAllExpenseTypes().subscribe((res: ExpenseType[]) => {
      this.expenseTypes = res;
      console.log("The actual data: "+ this.expenseTypes);
    });
  }
  invalidExpenseType()
  {
  	return (this.submitted && this.expenseForm.controls.expense_type.errors != null);
  }

  invalidValue()
  {
  	return (this.submitted && this.expenseForm.controls.value.errors != null);
  }

  invalidDate()
  {
  	return (this.submitted && this.expenseForm.controls.date.errors != null);
  }

  invalidComment()
  {
  	return (this.submitted && this.expenseForm.controls.comment.errors != null);
  }

  ngOnInit() {
    this.expenseForm = this.formBuilder.group({
  		expense_type: ['', Validators.required],
  		value: ['', Validators.required],
  		date: ['', [Validators.required, Validators.email]],
  	});
  }

  onSubmit()
  {
  	this.submitted = true;

  	if(this.expenseForm.invalid == true)
  	{
  		return;
  	}
  }

}
