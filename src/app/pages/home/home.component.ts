import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProductHeaderComponent } from './Home-Components/product-header/product-header.component';
import { FilterComponent } from './Home-Components/filter/filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatSidenavModule, ProductHeaderComponent, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  colsNum: number = 1;
  selectedCategory: string | undefined;
  constructor() {}

  onColsNumChange(colNum: number): void {
    this.colsNum = colNum;
  }

  onSelectedCategory(category: string): void {
    this.selectedCategory = category;
  }
}
