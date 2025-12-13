import { Component, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-search',
  imports: [ReactiveFormsModule],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css',
})
export class ProductSearch {
  searchControl = new FormControl('');

  searchChange = output<string>();

  private destroy$ = new Subject<void>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => {
        this.searchChange.emit(term?.trim() || '');
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
