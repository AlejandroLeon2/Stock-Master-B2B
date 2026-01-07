import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileText, LucideAngularModule } from 'lucide-angular';
import { take } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';
import { Order } from '../../../../core/models/order.model';
import { OrderService, OrdersPaginatedResponse } from '../../../../core/services/order/order';
import { BasicPagination } from '../../../../shared/ui/pagination/basic-pagination/basic-pagination';
import { UserOrder } from './components/user-order/user-order';

@Component({
  selector: 'app-user-orders',
  imports: [LucideAngularModule, UserOrder, BasicPagination],

  templateUrl: './user-orders.html',
  styleUrl: './user-orders.css',
})
export class UserOrders {
  readonly FileText = FileText;

  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  currentUser = this.authService.currentUser;

  data = signal<Order[]>([]);
  isLoading = signal(true);

  page = signal(1);
  metadata = signal<OrdersPaginatedResponse['metadata']>({ count: 0, pages: 0 });

  constructor() {
    effect(() => {
      const user = this.currentUser();
      if (!user) {
        this.router.navigate(['login']);
        return;
      }

      this.orderService
        .getOrdersByUserId(user.uid, { page: this.page() })
        .pipe(take(1))
        .subscribe({
          next: (response) => {
            if (response.data) {
              this.data.set(response.data.orders);
              this.metadata.set(response.data.metadata);
            }
          },
          complete: () => {
            this.isLoading.set(false);
          },
        });
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const page = params['page'] ? +params['page'] : 1;
      this.page.set(page);
    });
  }
}
