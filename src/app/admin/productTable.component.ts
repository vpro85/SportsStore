import { Component, IterableDiffer, IterableDiffers } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';

@Component({
  templateUrl: 'productTable.component.html',
})
export class ProductTableComponent {
  colsAndRows: string[] = ['id', 'name', 'category', 'price', 'buttons'];
  dataSource = new MatTableDataSource<Product>(this.repository.products());
  differ: IterableDiffer<Product>;

  constructor(private repository: ProductRepository, differs: IterableDiffers) {
    this.differ = differs.find(this.repository.products()).create();
  }

  ngDoCheck() {
    let changes = this.differ?.diff(this.repository.products());
    if (changes != null) {
      this.dataSource.data = this.repository.products();
    }
  }

  deleteProduct(id: number) {
    this.repository.deleteProduct(id);
  }
}
