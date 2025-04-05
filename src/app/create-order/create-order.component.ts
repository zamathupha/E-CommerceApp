import { Component, inject, OnInit, TrackByFunction } from '@angular/core';
import { MasterService } from '../service/master.service';
import { APIResposneModel, cartData, OrderModel } from '../model/Product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-create-order',
  imports: [CommonModule,RouterModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'] 
})
export class CreateOrderComponent implements OnInit {
  isCartPopupOpen: boolean = false
  masterService = inject(MasterService);
  cartData: cartData[] = [];
  totalAmount: number = 0;
  orderObj: OrderModel = new OrderModel(); 
  $index!: TrackByFunction<cartData>;

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.masterService.GetCartProductsByCustomerId(this.masterService.loggedUserData.custId).subscribe((res: APIResposneModel) => {
      this.cartData = res.data;
      this.cartData.forEach(element => {
        this.totalAmount += element.productPrice; 
      });
    });
  }

  placeOrder() {
    this.orderObj.CustId = this.masterService.loggedUserData.custId;
    this.orderObj.TotalInvoiceAmount = this.totalAmount;
    this.masterService.onPlaceOrder(this.orderObj).subscribe((res: APIResposneModel) => {
      if (res.result) {
        alert("Order placed successfully");
      } else {
        alert(res.message);
      }
    });
  }

}


