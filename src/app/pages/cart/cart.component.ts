import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'LED',
        price: 100,
        Qty: 4,
        Id: 1,
      },
    ],
  };
  dataSource: Array<CartItem> = [];
  constructor() {}
  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }
}
