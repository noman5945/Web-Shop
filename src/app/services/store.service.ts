import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const DEFAULT_URL = 'https://fakestoreapi.com';
@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private _httpClient: HttpClient) {}

  /**
   * Function to call an api which will return all products
   * @param sort type of sort. Either ascending or descending.
   * @param limit how many products we want to load in one request
   * @returns Array<Product>
   */
  getAllProducts(
    sort: string = 'desc',
    limit: number = 12
  ): Observable<Array<Product>> {
    return this._httpClient.get<Array<Product>>(
      `${DEFAULT_URL}/products?sort=${sort}&limit=${limit}`
    );
  }
}
