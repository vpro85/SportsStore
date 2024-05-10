import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from './product.model';
import { Order } from './order.model';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDataSource {
  baseUrl: string;
  auth_token?: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  get products(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + 'products');
  }

  saveOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl + 'orders', order);
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http
      .post<any>(this.baseUrl + 'login', {
        name: user,
        password: pass,
      })
      .pipe(
        map((response) => {
          this.auth_token = response.success ? response.token : null;
          return response.success;
        })
      );
  }
}
