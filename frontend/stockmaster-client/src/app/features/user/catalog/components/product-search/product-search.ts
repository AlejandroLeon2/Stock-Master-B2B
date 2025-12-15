import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { SearchInput } from '../../../../../shared/ui/inputs/search-input/search-input';

@Component({
  selector: 'app-product-search',
  imports: [ReactiveFormsModule, SearchInput],
  templateUrl: './product-search.html',
  styleUrls: ['./product-search.css'],
})
export class ProductSearch {
  term = input<string>('');
  searchControl = new FormControl(this.term());

  searchChange = output<string>();

  private destroy$ = new Subject<void>();

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    effect(() => {
      // Update the form control value without emitting an event
      this.searchControl.setValue(this.term(), { emitEvent: false });
    });
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => {
        const searchTerm = term?.trim() || '';
        this.searchChange.emit(searchTerm);
        // Update the URL with the new page parameter

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { search: searchTerm || null },
          queryParamsHandling: 'replace', // This will replace other query parameters
        });
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
