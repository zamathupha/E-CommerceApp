export interface APIResposneModel {
    message: string;
    result: boolean;
    data: any;
}

export interface category {
    categoryId: number;
    categoryName: string;
    parentCategoryId: number;
    userId: number;
}

export interface cartData {
    cartId: number;
    custId: number;
    productId: number;
    quantity: number;
    productShortName: string;
    addeddate: string;
    productName: string;
    categoryName: string;
    productImageUrl: string;
    productPrice: number;
}

export interface ProductList {
[x: string]: any;
    id: number;
    name: string;
    price: number;
   
}

export class customer {
    custId: number;
    name: string;
    MobileNo: string;
    Password: string;

    constructor() {
        this.custId = 0;
        this.MobileNo = ``;
        this.name = ``;
        this.Password = ``;
    }
}

export class OrderModel {
    SaleId: number;
    CustId: number;
    SaleDate: string;
    TotalInvoiceAmount: number;
    Discout: number;
    PaymenyNaration: string;
    DeliveryAddress1: string;
    DeliveryAddress2: string;
    DeliveryCity: string;
    DeliveryPinCode: string;
    DeliveryLandMark: string;
    IsCanceled: boolean;

    constructor() {
        this.SaleId = 0;
        this.CustId = 0;
        this.SaleDate = ``;
        this.TotalInvoiceAmount = 0;
        this.Discout = 0;
        this.PaymenyNaration = ``;
        this.DeliveryAddress1 = ``;
        this.DeliveryAddress2 = ``;
        this.DeliveryCity = ``;
        this.DeliveryPinCode = ``;
        this.DeliveryLandMark = ``;
        this.IsCanceled = false;
    }
}

export class LoginModel {
    UserName: string;
    UserPassword: string;

    constructor() {
        this.UserName = ``;
        this.UserPassword = ``;
    }
}

export class CardModel {
    CartId: number;
    CustId: number;
    ProductId: number;
    Quantity: number;
    AddedDate: Date;

    constructor() {
        this.CartId = 0;
        this.CustId = 0;
        this.ProductId = 0;
        this.Quantity = 1;
        this.AddedDate = new Date();
    }
}


