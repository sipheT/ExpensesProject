import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExpenseType } from '../ExpenseType';
import { ExpenseModel } from '../expenseModel';
import { Expense } from '../expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypesService {
  constructor(private http: HttpClient) { }

  private apiURL: string = 'http://localhost:8080';

  getAllExpenses(){
    return this.http.get(this.apiURL+"/api/expenses");
  }

  getAllExpenseTypes(){
    // now returns an Observable of Config
    return this.http.get(this.apiURL+"/api/expensetypes");
  }

  insertExpenseEntry(expense){
    return this.http.post<Expense>(this.apiURL+"/api/expenses", expense);
  }

  insertExpenseType(expenseType){
    return this.http.post<ExpenseType>(this.apiURL+"/api/expensetypes", expenseType);
  }

  updateExpenseEntry(expense){
    return this.http.put<Expense>(this.apiURL+"/api/expenses/"+expense.id, expense)
  }

  updateExpenseType(expenseType){
    return this.http.put<ExpenseType>(this.apiURL+"/api/expensetypes/"+expenseType.id, expenseType)
  }

  deleteExpenseEntry(id){
    return this.http.delete(this.apiURL+"/api/expenses/"+id)
  }

  deleteExpenseType(id){
    return this.http.delete(this.apiURL+"/api/expensetypes/"+id)
  }

}
