import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /**
   * Only Responsibilty of this service is to Handle adding items into cart or remove it
   * when a new observer subscribes to a BehaviorSubject, it immediately receives the current value (or the last value that was emitted).
   * simply the the value of 'cart' will change whenever a new item is added by the user on runtime
   * When added to the cart a notification will be displayed. MatsnackBar will do the job so the dependecy was injected via constructor
   * payment api http://localhost:5000/payment
   */
  cart = new BehaviorSubject<Cart>({ items: [] });
  constructor(private _snackBar: MatSnackBar) {}

  /**
   * Logic to add items into cart
   * @param item
   */
  addItemToCart(item: CartItem) {
    /**
     * Spread all existing items out of the cart array
     */
    const cartItems = [...this.cart.value.items];

    /**
     * Find if the currently added item already exists in the cart or not
     */

    const itemInCart = cartItems.find(
      (existingItem) => existingItem.Id === item.Id
    );

    /**
     * If the item is found then increase the Qty by 1 otherwise push the new item into cart array
     */
    if (itemInCart) {
      itemInCart.Qty = itemInCart.Qty + 1;
    } else {
      cartItems.push(item);
    }

    /**
     * Finally emit the object cart so that every components which are subscribed to cart can catch the updated value
     * Aand display success toast/snackbar/notification
     */
    this.cart.next({ items: cartItems });
    this._snackBar.open('1 item added to the cart', 'Ok', { duration: 3000 });
    console.log(this.cart.value);
  }

  /**
   * @param items
   * @returns Total price of items in cart
   */
  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.Qty)
      .reduce((prev, current) => prev + current, 0);
  }

  /**
   * Logic to remove all items from cart
   */
  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('All items in the cart are removed', 'Ok', {
      duration: 3000,
    });
  }

  /**
   * Logic to increase the quantity of that item
   * @param item
   */
  increaseQuantity(item: CartItem): void {
    this.cart.value.items.map((_item) => {
      if (_item.Id === item.Id) {
        _item.Qty++;
      }
    });
  }

  /**
   * Logic to decrease quantity. If lower than 0 then remove the whole item
   * @param item
   */
  reduceQuantity(item: CartItem): void {
    let removedItem;
    this.cart.value.items.map((_item) => {
      if (_item.Id === item.Id) {
        _item.Qty--;
      }
      if (_item.Qty === 0) {
        removedItem = _item;
      }
    });
    if (removedItem) {
      this.removeSingleItem(removedItem);
    }
  }

  /**
   * Logic to remove single item
   */
  removeSingleItem(item: CartItem): void {
    console.log(item.Id);
    console.log(this.cart.value.items);
    const filteredItems = this.cart.value.items.filter((_item) => {
      return _item.Id !== item.Id;
    });
    console.log(filteredItems);
    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed', 'OK', { duration: 3000 });
  }
}
