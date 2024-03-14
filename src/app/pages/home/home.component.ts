import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductHeaderComponent } from './Home-Components/product-header/product-header.component';
import { FilterComponent } from './Home-Components/filter/filter.component';
import { ProductBoxComponent } from './Home-Components/product-box/product-box.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../components/loader/loader.component';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 445 };

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatSidenavModule,
    ProductHeaderComponent,
    FilterComponent,
    MatGridListModule,
    ProductBoxComponent,
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  colsNum: number = 1;
  rowHight: number = ROWS_HEIGHT[this.colsNum];
  selectedCategory: string | undefined;

  allProducts: Array<Product> | undefined;
  sort: string = 'desc';
  limit: number = 12;
  productSubscription: Subscription | undefined;

  constructor(
    private _cartService: CartService,
    private _storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  /**
   * Destroy the subscription when componenet has been destroyed
   */
  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription?.unsubscribe();
    }
  }

  /**
   * Calling the api which is in "store.service.ts" and fetching the data on componenet
   * initalization
   */
  getProducts(): void {
    this.productSubscription = this._storeService
      .getAllProducts(this.sort, this.limit, this.selectedCategory)
      .subscribe((_allItems) => {
        this.allProducts = _allItems;
      });
  }

  onColsNumChange(colNum: number): void {
    this.colsNum = colNum;
  }

  onSelectedCategory(category: string): void {
    this.selectedCategory = category;
    this.getProducts();
    console.log(this.selectedCategory);
  }

  onSortOrderChange(sortType: string): void {
    this.sort = sortType;
    this.getProducts();
  }

  onItemsNumberChange(itemsNum: number) {
    this.limit = itemsNum;
    this.getProducts();
  }

  onAddItemToCart(product: Product): void {
    this._cartService.addItemToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      Qty: 1,
      Id: product.id,
    });
  }
}
