import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from '../../../../../../core/models/order.model';
import { OrderStatusPipe } from '../../../../../../shared/pipes/order-status.pipe';

@Component({
  selector: 'app-user-order',
  imports: [CurrencyPipe, DatePipe, OrderStatusPipe, RouterLink],
  templateUrl: './user-order.html',
  styleUrl: './user-order.css',
})
export class UserOrder {
  data = input.required<Order>();

  itemsPreview = computed(() => this.data().items.slice(0, 3));
}
