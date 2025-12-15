import { Component, computed, effect, inject, input, output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-basic-pagination',
  imports: [],
  templateUrl: './basic-pagination.html',
  styleUrl: './basic-pagination.css',
})
export class BasicPagination {
  page = input<number>(1);
  totalPages = input<number>(1);
  pageChange = output<number>();

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  //TODO: Implementar rango de páginas a mostrar ejemplo: total pages:10 --> 1,2,3,...,8,9,10
  pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  constructor() {
    effect(() => {
      // Update the URL with the new page parameter
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.page() },
        queryParamsHandling: 'merge', // This will preserve other query parameters
      });
    });
  }

  goToPage(page: number) {
    this.pageChange.emit(page);
  }
}
