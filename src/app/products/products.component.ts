import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MasterService } from '../service/master.service';
import { APIResposneModel, CardModel, category, ProductList } from '../model/Product';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productList: ProductList[] = [];
  categoryList$: Observable<category[]> = new Observable<category[]>();
  subscriptionList: Subscription[] = [];
  masterService = inject(MasterService);

  constructor() {}

  ngOnInit(): void {
    this.loadAllProducts();
    this.categoryList$ = this.masterService.getAllCategory().pipe(
      map(item => item.data)
    );
  }

  getProductByCategory(id: number) {
    this.masterService.getAllProductsByCategoryId(id).subscribe({
      next: (res: APIResposneModel) => {
        this.productList = res.data;
      },
      error: (err) => {
        console.error("Error fetching products by category:", err);
        alert("Failed to fetch products.");
      }
    });
  }

  loadAllProducts() {
    this.subscriptionList.push(
      this.masterService.getAllProducts().subscribe({
        next: (res: APIResposneModel) => {
          this.productList = res.data;
        },
        error: (err) => {
          console.error("Error loading products:", err);
        }
      })
    );
  }

  onAddToCart(id: number) {
    const newObj: CardModel = new CardModel();
    newObj.ProductId = id;
    newObj.CustId = this.masterService.loggedUserData.custId;

    this.masterService.addedtocart(newObj).subscribe({
      next: (res: APIResposneModel) => {
        if (res.result) {
          alert("Product Added to Cart");
          this.masterService.onCartAdded.next(true);
        } else {
          alert(res.message);
        }
      },
      error: (err: any) => {
        console.error("Error adding to cart:", err);
        alert("Failed to add product to cart.");
      }
    });
  }

  trackByCategory(index: number, item: category): number {
    return item.categoryId;
  }

  trackByProduct(index: number, item: ProductList): number {
    return item.id;
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(sub => sub.unsubscribe());
  }
}




