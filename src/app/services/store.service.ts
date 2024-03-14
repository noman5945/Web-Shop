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
    limit: number = 12,
    category?: string
  ): Observable<Array<Product>> {
    return this._httpClient.get<Array<Product>>(
      `${DEFAULT_URL}/products${
        category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    );
  }

  /**
   * Function to get all categories by calling the api
   * @returns Array of categories (ArraY<string>)
   */
  getAllCategories(): Observable<Array<string>> {
    return this._httpClient.get<Array<string>>(
      `${DEFAULT_URL}/products/categories`
    );
  }
}
