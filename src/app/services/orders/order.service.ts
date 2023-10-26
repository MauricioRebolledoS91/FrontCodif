import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _http: HttpClient) {}

  addOrder(data: any): Observable<any> {
    return this._http.post('https://localhost:7106/api/Orders/AddNewOrder', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:7106/employees/${id}`, data);
  }

  getOrderList(): Observable<any> {
    return this._http.get('https://localhost:7106/api/Orders/GetNextOrderPredicitonList');
  }

  getOrdersByCustomerId(id: number): Observable<any> {
    return this._http.get(`https://localhost:7106/api/Orders/GetOrderListByCustomer?id=${id}`);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:7106/employees/${id}`);
  }
}