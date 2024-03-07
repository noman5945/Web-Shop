import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductHeaderComponent } from './Home-Components/product-header/product-header.component';
import { FilterComponent } from './Home-Components/filter/filter.component';
import { ProductBoxComponent } from './Home-Components/product-box/product-box.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  colsNum: number = 1;
  rowHight: number = ROWS_HEIGHT[this.colsNum];
  selectedCategory: string | undefined;
  constructor(private _cartService: CartService) {}

  onColsNumChange(colNum: number): void {
    this.colsNum = colNum;
  }

  onSelectedCategory(category: string): void {
    this.selectedCategory = category;
  }

  onAddItemToCart(product: Product): void {
    this._cartService.addItemToCart({
      product: product.imageURL,
      name: product.title,
      price: product.price,
      Qty: 1,
      Id: product.id,
    });
  }
}
