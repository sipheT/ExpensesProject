import { Component, OnInit } from '@angular/core';
import { ExpenseTypesService } from '../services/expense-types.service';
import { ExpenseTypeModel } from '../ExpenseTypeModel';
import { ExpenseType } from '../ExpenseType';
import { ExpenseTypeFormService } from '../services/expense-type-form.service';
import { NotificationService } from '../services/notification.service';
import { MatDialogRef } from '@angular/material';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-expense-type-form',
  templateUrl: './expense-type-form.component.html',
  styleUrls: ['./expense-type-form.component.css']
})
export class ExpenseTypeFormComponent implements OnInit {

  expenseTypes: ExpenseTypeModel[] = [];

  constructor(private expenseTypesService: ExpenseTypesService, 
              private expenseTypeFormService: ExpenseTypeFormService, 
              private notificationService: NotificationService,
              public matDialogRef: MatDialogRef<ExpenseTypeFormComponent>) { 
    
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

  onSubmit()
  {

    let expenseType: ExpenseTypeModel = new ExpenseTypeModel(
      this.expenseTypeFormService.expenseTypeForm.value.id, 
      this.expenseTypeFormService.expenseTypeForm.value.name,
      this.expenseTypeFormService.expenseTypeForm.value.comment
    );
    if(this.expenseTypeFormService.expenseTypeForm.value.id==null){
      this.expenseTypesService.insertExpenseType(expenseType).subscribe(()=>{
          this.getAllExpenseTypes();
      });
      this.onClose();
      this.notificationService.success('Expense Type Successfully added!');
    }
    else{
      this.expenseTypesService.updateExpenseType(expenseType).subscribe(()=>{
        this.getAllExpenseTypes()
      });
      this.onClose();
      this.notificationService.success('Expense Type Successfully updated!');
    }
    
    this.expenseTypeFormService.expenseTypeForm.reset();

    }
    onClear(){
      this.expenseTypeFormService.expenseTypeForm.reset();
      this.expenseTypeFormService.initializeFormGroup();
    }

    onClose(){
      this.expenseTypeFormService.expenseTypeForm.reset();
      this.expenseTypeFormService.initializeFormGroup();
      this.matDialogRef.close();
    }
}

