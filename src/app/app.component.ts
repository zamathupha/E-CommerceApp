import { Component, ElementRef, OnInit, ViewChild, OnDestroy, TrackByFunction } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MasterService } from './service/master.service';
import { APIResposneModel, cartData, customer, LoginModel } from './model/Product';
import { Constant } from './constant/constant';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  @ViewChild('registerModal', { static: false }) registerModel!: ElementRef;
  @ViewChild('loginModal', { static: false }) loginModal!: ElementRef;

  registerObj: customer = new customer();
  loginObj: LoginModel = new LoginModel();
  loggedUserData: customer = new customer();
  cartData: cartData[] = [];
  isCartPopupOpen: boolean = false;

  
  private subscriptions: Subscription[] = [];

  
  isRegisterModalOpen: boolean = false;
  isLoginModalOpen: boolean = false;
  index!: TrackByFunction<cartData>;

  constructor(private masterService: MasterService) {}

 
  ngOnInit(): void {
   
    const isUser = localStorage.getItem(Constant.LOCAL_KEY);
    if (isUser) {
      try {
        const parseObj = JSON.parse(isUser);
        this.loggedUserData = parseObj;
        this.getCartItems();
      } catch (error) {
        console.error(`Error parsing localStorage key '${Constant.LOCAL_KEY}':`, error);
        localStorage.removeItem(Constant.LOCAL_KEY);
      }
    }

    
    const cartSubscription = this.masterService.onCartAdded.subscribe((res: boolean) => {
      if (res) {
        this.getCartItems();
      }
    });
    this.subscriptions.push(cartSubscription);
  }

  ngOnDestroy(): void {
   
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  
  openRegisterModel() {
    this.isRegisterModalOpen = true;
  }

  closeRegisterModel() {
    this.isRegisterModalOpen = false;
  }

  openLoginModel() {
    this.isLoginModalOpen = true;
  }

  closeLoginModel() {
    this.isLoginModalOpen = false;
  }

 
  onRegister() {
    this.masterService.registerNewCustomer(this.registerObj).subscribe((res: APIResposneModel) => {
      if (res.result) {
        alert("Registration Success");
        this.closeRegisterModel();
      } else {
        alert(res.message);
      }
    });
  }

  onLogin() {
    this.masterService.onLogin(this.loginObj).subscribe((res: APIResposneModel) => {
      if (res.result) {
        this.loggedUserData = res.data;
        localStorage.setItem(Constant.LOCAL_KEY, JSON.stringify(res.data));
        this.closeLoginModel();
        this.getCartItems();
      } else {
        alert(res.message);
      }
    });
  }

  getCartItems() {
    this.masterService.GetCartProductsByCustomerId(this.loggedUserData.custId).subscribe((res: APIResposneModel) => {
      this.cartData = res.data;
    });
  }

  onRemoveProduct(cartId: number) {
    this.masterService.deleteProductFromCartById(cartId).subscribe((res: APIResposneModel) => {
      if (res.result) {
        alert('Product Removed from cart');
        this.getCartItems();
      } else {
        alert(res.message);
      }
    });
  }

  
  showCartPopup() {
    this.isCartPopupOpen = !this.isCartPopupOpen;
  }

  logoff() {
    localStorage.removeItem(Constant.LOCAL_KEY);
    this.loggedUserData = new customer();
    this.cartData = [];
  }


  trackByIndex(index: number): number {
    return index;
  }
}
