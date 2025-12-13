import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  map,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { SearchProductsUseCase } from '../../../../core/application/use-cases/product/search-product.usecase';
import { Product } from '../../../../core/domain/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CatalogService implements OnDestroy {
  private searchProductsUseCase = inject(SearchProductsUseCase);

  private search$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() {
    this.initSearchFlow();
  }

  searchProducts(term: string) {
    this.search$.next(term);
  }

  private initSearchFlow() {
    this.search$
      .pipe(
        debounceTime(300),
        map((term) => term.trim()),
        distinctUntilChanged(),
        filter((term) => term.length >= 2 || term.length === 0),
        tap(() => {
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap((term) =>
          from(this.searchProductsUseCase.execute({ search: term, limit: 10 })).pipe(
            catchError((err) => {
              console.error(err);
              this.error.set('Error al buscar productos');
              return [[] as Product[]];
            })
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe((products) => {
        this.products.set(products);
        this.loading.set(false);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
