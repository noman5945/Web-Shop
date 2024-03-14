import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { StoreService } from '../../../../services/store.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit, OnDestroy {
  categories: Array<string> | undefined;
  categorySubscriber: Subscription | undefined;
  @Output()
  showCategory: EventEmitter<string> = new EventEmitter();

  constructor(private _storeService: StoreService) {}

  ngOnInit(): void {
    this.categorySubscriber = this._storeService
      .getAllCategories()
      .subscribe((category) => {
        this.categories = category;
      });
  }

  ngOnDestroy(): void {
    this.categorySubscriber?.unsubscribe();
  }
  onShowCategory(category: string) {
    this.showCategory.emit(category);
  }
}
