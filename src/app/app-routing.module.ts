import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { ExpenseTypesListComponent } from './expense-types-list/expense-types-list.component';

const routes: Routes = [
  {
    path: 'expenses',
    component: DataTableComponent,
  },
  {
    path: 'expensetypes',
    component: ExpenseTypesListComponent,
  },
  {
    path: '',   
    redirectTo: '/expenses', 
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
