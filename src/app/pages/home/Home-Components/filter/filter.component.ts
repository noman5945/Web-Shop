import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  categories: string[] = ['Robotics', 'Software'];
  @Output()
  showCategory: EventEmitter<string> = new EventEmitter();

  onShowCategory(category: string) {
    this.showCategory.emit(category);
  }
}
