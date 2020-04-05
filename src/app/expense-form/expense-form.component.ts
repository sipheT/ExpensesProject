import { Component, OnInit } from '@angular/core';
import { ExpenseTypesService } from '../services/expense-types.service';
import { ExpenseType } from '../ExpenseType';
import { Expense } from '../expense';
import { ExpenseModel } from '../expenseModel';
import { ExpenseFormService } from '../services/expense-form-service.service';
import { NotificationService } from '../services/notification.service';
import { MatDialogRef } from '@angular/material';
import { MatToolbar } from '@angular/material/toolbar';


@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {
  
  submitted = false;
  expenseTypes: ExpenseType[] = [];
  expenses: ExpenseModel[] = [];
  newEntry: boolean = true; 

  constructor(private expenseTypesService: ExpenseTypesService, 
              private expenseFormService: ExpenseFormService, 
              private notificationService: NotificationService,
              public matDialogRef: MatDialogRef<ExpenseFormComponent>) { 
    
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
      this.expenseFormService.expenseForm.value.id, 
      expenseTypeId,
      this.expenseFormService.expenseForm.value.value,
      this.expenseFormService.expenseForm.value.date,
      this.expenseFormService.expenseForm.value.comment
    );
    if(this.expenseFormService.expenseForm.value.id==null){
      this.expenseTypesService.insertExpenseEntry(expense).subscribe(()=>{
          this.getAllExpenseTypes();
      });

      this.notificationService.success('Expense Successfully added!');
    }
    else{
      this.expenseTypesService.updateExpenseEntry(expense).subscribe(()=>{
        this.getAllExpenseTypes()
      });

      this.notificationService.success('Expense Successfully updated!');
    }
    this.onClose();
    
    this.expenseFormService.expenseForm.reset();
    
    
  }

  onClear(){
    this.expenseFormService.expenseForm.reset();
    this.expenseFormService.initializeFormGroup();
  }

  onClose(){
    this.expenseFormService.expenseForm.reset();
    this.expenseFormService.initializeFormGroup();
    this.matDialogRef.close();
  }

}
