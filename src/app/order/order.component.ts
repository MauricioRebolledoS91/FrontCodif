import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OrderService } from '../services/orders/order.service';
import { CoreService } from '../core/core.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'requireddate',
    'shippeddate',
    'shipname',
    'shipaddress',
    'shipcity'
  ];
  //dataSource!: MatTableDataSource<any>;
  dataSource = new MatTableDataSource();
  receivedId: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: OrderService,
    private _coreService: CoreService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
        this.receivedId = +params['id'];
      });
  }

  ngOnInit(): void {
    this.getOrderLisByCustomer();
  }

  getOrderLisByCustomer() {
    this._empService.getOrdersByCustomerId(this.receivedId).subscribe({
        next: (data) => {
            this.dataSource.data = data;
            console.log(data);
         },
        error: console.log,
        });
    }



}
