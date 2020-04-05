import { Component, OnInit } from '@angular/core';
import { ExpenseTypesService } from '../services/expense-types.service';
import { ExpenseType } from '../ExpenseType';
import { Expense } from '../expense';
import { ExpenseModel } from '../expenseModel';
import { ExpenseFormService } from '../services/expense-form-service.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  
  submitted = false;
  expenseTypes: ExpenseType[] = [];
  expenses: ExpenseModel[] = [];

  constructor(private expenseTypesService: ExpenseTypesService, private expenseFormService: ExpenseFormService, private notificationService: NotificationService) { 
    
  }
  ngOnInit() {
    
    this.getAllExpenseTypes();
    
  }

  getAllExpenseTypes(){
    this.expenseTypesService.getAllExpenseTypes().subscribe((res: ExpenseType[]) => {
      this.expenseTypes = res;
      //console.log("The actual data: "+ this.expenseTypes);
    });
  }

  getAllExpenses(){
    this.expenseTypesService.getAllExpenses().subscribe((res: Expense[]) => {
      for(let i = 0; i < res.length; i++){
        let expenseType = this.expenseTypes.find(x => x.id == res[i].expenseTypeId).name;
        let expense = new ExpenseModel(res[i].id, expenseType, res[i].value, res[i].date, res[i].comment);
        this.expenses[i] = expense;
      }
      //console.log("All Expenses: "+ this.expenses);
    });
  }

  onSubmit()
  {
    let expenseTypeId = this.expenseTypes.find(x => x.name == this.expenseFormService.expenseForm.value.expensetype).id;
    let expense: Expense = new Expense(
      1, 
      expenseTypeId,
      this.expenseFormService.expenseForm.value.value,
      this.expenseFormService.expenseForm.value.date,
      this.expenseFormService.expenseForm.value.comment
    );
    this.expenseTypesService.insertExpenseEntry(expense).subscribe(()=>{
        this.getAllExpenseTypes()
    });
    this.notificationService.success('Expense Successfully added!');
    this.expenseFormService.expenseForm.reset();
    this.submitted = true;
    
  }

  onClear(){
    this.expenseFormService.expenseForm.reset();
    this.expenseFormService.initializeFormGroup();
  }

}
