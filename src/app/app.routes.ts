import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

export const routes: Routes = [
    {path:``,redirectTo:`home`, pathMatch: `full`},
    {path:`home`, component: ProductsComponent},
    {path:`create-order`, component: CreateOrderComponent},
    {path:`my-order`, component: MyOrdersComponent}
];
