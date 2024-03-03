import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.css',
})
export class ProductHeaderComponent {
  sortOrder: string = 'Desc';
  showNumberofItems: number = 12;
  showItemsLimit: number[] = [12, 24, 36];

  constructor() {}

  onSortUpdate(newSortType: string): void {
    this.sortOrder = newSortType;
  }

  onShowItemNumberUpdate(itemNum: number): void {
    this.showNumberofItems = itemNum;
  }
}
