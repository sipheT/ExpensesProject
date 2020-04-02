import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExpenseType } from '../ExpenseType';


@Injectable({
  providedIn: 'root'
})
export class ExpenseTypesService {
  constructor(private http: HttpClient) { }

  private expenseTypesURL: string = 'http://localhost:8080/api/expenses';
  getAllExpenseTypes(){
    // now returns an Observable of Config
    return this.http.get(this.expenseTypesURL);
  }
}
