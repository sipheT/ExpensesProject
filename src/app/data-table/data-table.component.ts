import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material'
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import { ExpenseTypesService } from '../services/expense-types.service';
import { ExpenseType } from '../ExpenseType';
import { Expense } from '../expense';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

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

  constructor(private expenseTypesService: ExpenseTypesService, public matDialog: MatDialog) { 
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
    this.matDialog.open(ExpenseFormComponent);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
