import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule,
    RouterModule,
    MatMenuModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity: number = 0;
  @Input()
  get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.Qty)
      .reduce((prev, current) => prev + current, 0);
  }
  constructor(private _cartService: CartService) {}

  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items);
  }

  onClearCart(): void {}
}
