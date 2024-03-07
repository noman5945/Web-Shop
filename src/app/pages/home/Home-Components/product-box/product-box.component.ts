import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../../models/product.model';
import { CartItem } from '../../../../models/cart.model';

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id: 1,
    title: 'LED',
    price: 150,
    category: 'Robotics',
    description: 'Description',
    imageURL: 'https://via.placeholder.com/150',
  };
  @Output()
  addToCart: EventEmitter<Product> = new EventEmitter();
  constructor() {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
