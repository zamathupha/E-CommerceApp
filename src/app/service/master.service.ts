import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { APIResposneModel, CardModel, customer, LoginModel, OrderModel } from '../model/Product';
import { Constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  apiurl: string = `https://freeapi.miniprojectideas.com/api/BigBasket/`;
  onCartAdded: Subject<boolean> = new Subject<boolean>();
  loggedUserData: customer = new customer();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const isUser = localStorage.getItem(Constant.LOCAL_KEY);
      if (isUser != null) {
        const parseObj = JSON.parse(isUser);
        this.loggedUserData = parseObj;
      }
    }
  }
  

  getAllProducts(): Observable<APIResposneModel> {
    return this.http.get<APIResposneModel>(this.apiurl + "GetAllProducts");
  }
  
  getAllCategory(): Observable<APIResposneModel> {
    return this.http.get<APIResposneModel>(this.apiurl + "GetAllCategory");
  }

  getAllProductsByCategoryId(categoryId: number): Observable<APIResposneModel> {
    const url = `${this.apiurl}GetAllProductsByCategoryId?id=${categoryId}`;
    return this.http.get<APIResposneModel>(url);
  }

  registerNewCustomer(obj: customer): Observable<APIResposneModel> {
    const url = `${this.apiurl}RegisterCustomer`;
    return this.http.post<APIResposneModel>(url, obj);
  }

  addedtocart(newObj: CardModel): Observable<APIResposneModel> {
    const url = `${this.apiurl}AddToCart`;
    console.log(newObj); 
    return this.http.post<APIResposneModel>(url, newObj); 
  }

  addToCart(newObj: CardModel): Observable<APIResposneModel> {
    const url = `${this.apiurl}AddToCart`;
    console.log(newObj); 
    return this.http.post<APIResposneModel>(url, newObj); 
  }

  onLogin(obj: LoginModel): Observable<APIResposneModel> {
    const url = `${this.apiurl}LoginCustomer`;
    return this.http.post<APIResposneModel>(url, obj);
  }

  GetCartProductsByCustomerId(loggedUserId: number): Observable<APIResposneModel> {
    const url = `${this.apiurl}GetCartProductsByCustomerId?id=${loggedUserId}`;
    return this.http.get<APIResposneModel>(url);
  }

  deleteProductFromCartById(cartId: number): Observable<APIResposneModel> {
    const url = `${this.apiurl}DeleteProductFromCartById?id=${cartId}`;
    return this.http.get<APIResposneModel>(url);
  }

  onPlaceOrder(obj: OrderModel): Observable<APIResposneModel> {
    const url = `${this.apiurl}PlaceOrder`;
    return this.http.post<APIResposneModel>(url, obj);
  }
}


 