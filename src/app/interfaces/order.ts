export interface Order {
    employee: string;
    shipper: string;
    shipName: string;
    shipAddress: string;
    shipCity: string;
    product: string;
    shipCountry: string;
    pickerOrderDate: Date;
    pickerRequiredDate: Date;
    pickerShippedDate: Date;
    freight: number;
    unitPrice: number;
    quantity: number;
    discount: number;
}