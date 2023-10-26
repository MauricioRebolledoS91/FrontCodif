import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Shipperervice {
  constructor(private _http: HttpClient) {}


  getShipperList(): Observable<any> {
    return this._http.get('https://localhost:7106/api/Shippers/GetShippers');
  }

}