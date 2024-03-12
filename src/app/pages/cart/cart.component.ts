import { Component, NgModule, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  /**
   * TO DO : utilize local storage to prvent auto item removal from cart in refresh
   */

  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'LED',
        price: 100,
        Qty: 4,
        Id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'LED',
        price: 100,
        Qty: 4,
        Id: 2,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  //, 'Id'
  displayColumns: Array<string> = [
    'product',
    'name',
    'price',
    'Qty',
    'Total',
    'Action',
  ];
  constructor(private _cartService: CartService) {}
  ngOnInit(): void {
    this._cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.Qty)
      .reduce((prev, current) => prev + current, 0);
  }

  removeAllItems() {
    return this._cartService.clearCart();
  }

  removeSingleItem(item: CartItem) {
    return this._cartService.removeSingleItem(item);
  }

  increaseItemQty(item: CartItem) {
    return this._cartService.increaseQuantity(item);
  }

  decreaseItemQty(item: CartItem) {
    return this._cartService.reduceQuantity(item);
  }
}
