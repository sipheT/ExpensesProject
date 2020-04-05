import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ExpenseFormComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ExpenseFormComponent]
})
export class AppModule { }
