import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  getProductList(): Observable<any> {
    return this._http.get('https://localhost:7106/api/Product/GetProducts');
  }

}