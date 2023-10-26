import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from '../services/orders/order.service';
import { CoreService } from '../core/core.service';
import { Router } from '@angular/router';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'action',
  ];
  //dataSource!: MatTableDataSource<any>;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: OrderService,
    private _coreService: CoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPredicterOrderList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPredicterOrderList();
        }
      },
    });
  }

  getPredicterOrderList() {
    this._empService.getOrderList().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getPredicterOrderList();
      },
      error: console.log,
    });
  }

  openEditForm(row: any) {
    const idToPass = row.id;
    this.router.navigate(['/order', idToPass]); 
  }
}
