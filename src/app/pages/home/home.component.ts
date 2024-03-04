import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductHeaderComponent } from './Home-Components/product-header/product-header.component';
import { FilterComponent } from './Home-Components/filter/filter.component';
import { ProductBoxComponent } from './Home-Components/product-box/product-box.component';

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
  constructor() {}

  onColsNumChange(colNum: number): void {
    this.colsNum = colNum;
  }

  onSelectedCategory(category: string): void {
    this.selectedCategory = category;
  }
}
