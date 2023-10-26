import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../interfaces/employee';
import { Shipperervice } from '../services/shippers/shipper.service';
import { Shipper } from '../interfaces/shipper';
import { ProductService } from '../services/products/product.service';
import { Product } from '../interfaces/product';
import { OrderService } from '../services/orders/order.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  filteredOptions: any[] = [];
  optionsShippers: any[] = [];
  filteredShippers: any[] = [];
  optionsProducts: any[] = [];
  filteredProducts: any[] = [];
  options: Employee[] = [];
  employee!: Employee;
  shipper!: Shipper;
  product!: Product;
  shippedDate: Date | null = null;
  requiredDate: Date | null = null;
  orderDate: Date | null = null;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    private _shipperService: Shipperervice,
    private _productService: ProductService,
    private _orderService: OrderService
  ) {
    this.empForm = this._fb.group({
      employee: '',
      shipper: '',
      shipName: '',
      shipAddress: '',
      shipCity: '',
      product: '',
      shipCountry: '',
      pickerOrderDate: '',
      pickerRequiredDate: '',
      pickerShippedDate: '',
      freight: '',
      unitPrice: '',
      quantity: '',
      discount: ''
    });

    this.empForm.get('employee')?.valueChanges.subscribe(value => {
      this.filteredOptions =  this._filterEmployees(value)
    })

    this.empForm.get('shipper')?.valueChanges.subscribe(value => {
      this.optionsShippers =  this._filterShippers(value)
    })

    this.empForm.get('product')?.valueChanges.subscribe(value => {
      this.optionsProducts =  this._filterProducts(value)
    })

    this.getEmployees();
    this.getShippers();
    this.getProducts();
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
        this._orderService.addOrder(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Order added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        
      })
    }
  }

  private _filterEmployees(value: any): Employee[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.fullName.toLowerCase();
    return this.options.filter(option => option.fullName.toLowerCase().includes(filterValue));
  }

  private _filterShippers(value: any): Shipper[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.companyName.toLowerCase();
    return this.optionsShippers.filter(option => option.companyName.toLowerCase().includes(filterValue));
  }

  private _filterProducts(value: any): Product[] {
    const filterValue = typeof value === "string" ? value.toLowerCase() : value.productName.toLowerCase();
    return this.optionsProducts.filter(option => option.productName.toLowerCase().includes(filterValue));
  }

  private getEmployees(){
    this._empService.getEmployeeList().subscribe({
      next: (data) => {
        this.options = data;
        this.filteredOptions = data;
            console.log(data);
      },
      error: (e) => {
      },
      complete: () => {

      }
    })
  }

  public employeeSelected(event: any) {
    this.employee = event.option.value;
  }

  public showEmployee(employee: Employee): string {
    return employee.fullName;
  }

  public getShippers(){
    this._shipperService.getShipperList().subscribe({
      next: (data) => {
        this.optionsShippers = data;
        this.filteredShippers = data;
            console.log(data);
      },
      error: (e) => {
      },
      complete: () => {

      }
    })
  }

  public shipperSelected(event: any) {
    this.shipper = event.option.value;
  }

  public showShipper(shipper: Shipper): string {
    return shipper.companyName;
  }

  public getProducts(){
    this._productService.getProductList().subscribe({
      next: (data) => {
        this.optionsProducts = data;
        this.filteredProducts = data;
            console.log(data);
      },
      error: (e) => {
      },
      complete: () => {

      }
    })
  }

  public productSelected(event: any) {
    this.product = event.option.value;
  }

  public showproduct(product: Product): string {
    return product.productName;
  }
}
