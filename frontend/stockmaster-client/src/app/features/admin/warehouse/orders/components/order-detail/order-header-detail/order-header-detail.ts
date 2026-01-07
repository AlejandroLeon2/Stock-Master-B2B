import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { OrderDeliveryAddress } from '../../../../../../../core/models/order.model';
import { environment } from '../../../../../../../../environments/environment';

@Component({
  selector: 'app-order-header-detail',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './order-header-detail.html',
  styleUrl: './order-header-detail.css',
})
export class OrderHeaderDetail {
  orderId = input.required<string>();
  orderDate = input.required<number>();
  totalAmount = input.required<number>();
  address = input.required<OrderDeliveryAddress>();
  companyName = input.required<string>();

  openFacturaPdf() {
    const baseUrl = environment.apiURL + '/document';
    const orderId = this.orderId();
    const url = `${baseUrl}/factura/${orderId}`;
    window.open(url, '_blank');
  }
}
