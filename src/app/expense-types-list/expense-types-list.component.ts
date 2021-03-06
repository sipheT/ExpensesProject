import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material'
import { ExpenseTypeDataSource, DataTableItem } from './expense-type-datasource';
import { ExpenseTypesService } from '../services/expense-types.service';
import { ExpenseTypeFormService } from '../services/expense-type-form.service';
import { ExpenseType } from '../ExpenseType';
import { Expense } from '../expense';
import { ExpenseTypeFormComponent } from '../expense-type-form/expense-type-form.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-expense-types-list',
  templateUrl: './expense-types-list.component.html',
  styleUrls: ['./expense-types-list.component.css']
})
export class ExpenseTypesListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<DataTableItem>;
  dataSource: ExpenseTypeDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Id', 'Name', 'Comment', 'Actions'];
  expenseTypes: DataTableItem[] = [];
  searchKey: string = "";

  constructor(private expenseTypesService: ExpenseTypesService, 
    private expenseTypeFormService: ExpenseTypeFormService,
    public matDialog: MatDialog,
    private notificationService: NotificationService) { 
  }

  ngOnInit() {
    this.dataSource = new ExpenseTypeDataSource();
    this.expenseTypesService.getAllExpenseTypes().subscribe((res: ExpenseType[]) => {
      //this.expenseTypes = res;
      for(let i=0; i< res.length; i++){
        let expenseType: DataTableItem = {
          Id: res[i].id,
          Name: res[i].name,
          Comment: res[i].comment
        };
        this.expenseTypes[i] = expenseType;
      }
      this.dataSource.data = this.expenseTypes;
      //console.log("The actual data: "+ this.expenseTypes);
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
    this.matDialog.open(ExpenseTypeFormComponent, matDialogConfig);
    
  }

  onEdit(row){
    this.expenseTypeFormService.populateForm(row);
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.disableClose = true;
    matDialogConfig.autoFocus = true;
    this.matDialog.open(ExpenseTypeFormComponent, matDialogConfig);
  }

  onDelete(id){
    this.expenseTypesService.deleteExpenseType(id).subscribe(()=>{
      //this.getAllExpenseTypes();
      this.notificationService.success('Expense Type Successfully deleted!');
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
