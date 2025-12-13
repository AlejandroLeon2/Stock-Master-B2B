import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../domain/models/product.model';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { ApiService } from '../http/api.service';

@Injectable()
export class ProductHttpRepository implements ProductRepository {
  private api = inject(ApiService);

  async search(params: { search?: string; page?: number; limit?: number }): Promise<Product[]> {
    const response = await firstValueFrom(
      this.api.get<Product[]>('/products', {
        params: {
          search: params.search || '',
          page: params.page || 1,
          limit: params.limit || 10,
        },
      })
    );

    if (response.success || response.data) {
      return response.data || [];
    }

    throw new Error(response.error?.message);
  }
}
