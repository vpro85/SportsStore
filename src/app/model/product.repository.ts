import { Injectable, Signal, computed, signal } from '@angular/core';
import { Product } from './product.model';
import { RestDataSource } from './rest.datasource';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class ProductRepository {
  products = signal<Product[]>([]);
  categories: Signal<string[]>;

  constructor(private dataSource: RestDataSource) {
    dataSource.products.subscribe((data) => {
      this.products.set(data);
    });
    this.categories = computed(() => {
      return this.products()
        .map((p) => p.category ?? '(None')
        .filter((c, index, array) => array.indexOf(c) == index)
        .sort();
    });
  }

  getProduct(id: number): Product | undefined {
    return this.products().find((p) => p.id == id);
  }

  saveProduct(product: Product) {
    if (product.id == null || product.id == 0) {
      this.dataSource.saveProduct(product).subscribe((p) => {
        this.products.update((pdata) => [...pdata, p]);
      });
    } else {
      this.dataSource.updateProduct(product).subscribe((p) => {
        this.products.update((pdata) => {
          const idx = pdata.findIndex((p) => p.id == product.id);
          return [...pdata.slice(0, idx), product, ...pdata.slice(idx + 1)];
        });
      });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe((p) => {
      this.products.update((pdata) => {
        const idx = pdata.findIndex((p) => p.id == id);
        return [...pdata.slice(0, idx - 1), ...pdata.slice(idx + 1)];
      });
    });
  }
}
