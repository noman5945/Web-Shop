import { Component, EventEmitter, Output } from '@angular/core';
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
  sortOrder: string = 'desc';
  showNumberofItems: number = 12;
  showItemsLimit: number[] = [12, 24, 36];
  @Output()
  changeColumn = new EventEmitter<number>();
  @Output()
  changeSortOrder = new EventEmitter<string>();
  @Output()
  changeItemNumber = new EventEmitter<number>();

  constructor() {}

  onSortUpdate(newSortType: string): void {
    this.sortOrder = newSortType;
    this.changeSortOrder.emit(newSortType);
  }

  onShowItemNumberUpdate(itemNum: number): void {
    this.showNumberofItems = itemNum;
    this.changeItemNumber.emit(itemNum);
  }

  onColumnChange(colsNum: number): void {
    this.changeColumn.emit(colsNum);
  }
}
