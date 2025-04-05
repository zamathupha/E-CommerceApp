import { Component, TrackByFunction } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
viewOrderDetails: any;
orders: any;
  trackByOrder!: TrackByFunction<any>;

}
