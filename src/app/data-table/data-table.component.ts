import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material'
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { ExpenseTypesService } from '../services/expense-types.service';
import { ExpenseFormService } from '../services/expense-form-service.service';
import { ExpenseType } from '../ExpenseType';
import { Expense } from '../expense';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Id', 'ExpenseType', 'Value', 'Date', 'Comment', 'Actions'];
  expenseTypes: ExpenseType[] = [];
  expenses: DataTableItem[] = [];
  searchKey: string = "";

  constructor(private expenseTypesService: ExpenseTypesService, 
    private expenseFormService: ExpenseFormService,
    public matDialog: MatDialog,
    private notificationService: NotificationService) { 
  }

  ngOnInit() {
    this.dataSource = new DataTableDataSource();
    this.expenseTypesService.getAllExpenseTypes().subscribe((res: ExpenseType[]) => {
      this.expenseTypes = res;
      //console.log("The actual data: "+ this.expenseTypes);
    });

    this.expenseTypesService.getAllExpenses().subscribe((res: Expense[]) => {
      for(let i = 0; i < res.length; i++){
        let expenseType = this.expenseTypes.find(x => x.id == res[i].expenseTypeId).name;
        let expense: DataTableItem = {
          Id: res[i].id, 
          ExpenseType: expenseType, 
          Value: res[i].value, 
          Date: res[i].date, 
          Comment: res[i].comment
        };
        this.expenses[i] = expense;
      }
      console.log("All Expenses: "+ this.expenses);
      this.dataSource.data = this.expenses;
      alert(this.dataSource.data[0].ExpenseType);
      console.log("Datasource: "+this.dataSource.data);
    });
    
  }

  onSearchClear(){
    this.searchKey = "";
  }

  applyFilter(){
  }

  onCreate(){
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    this.matDialog.open(ExpenseFormComponent, matDialogConfig);
    
  }

  onEdit(row){
    this.expenseFormService.populateForm(row);
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    this.matDialog.open(ExpenseFormComponent, matDialogConfig);
  }

  onDelete(id){
    this.expenseTypesService.deleteExpenseEntry(id).subscribe(()=>{
      //this.getAllExpenseTypes();
      this.notificationService.success('Expense Successfully deleted!');
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
