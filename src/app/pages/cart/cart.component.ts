import { Component, NgModule, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

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
  constructor() {}
  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.Qty)
      .reduce((prev, current) => prev + current, 0);
  }
}
