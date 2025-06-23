import { Injectable } from '@angular/core';
import { HttpService } from '../http_service/http.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpService) {}

  getAllBooks() {
    return this.http.getApi('bookstore_user/get/book');
  }

  getCartItems() {
    const headers = this.http.getHeader();
    return this.http.getApi('bookstore_user/get_cart_items', headers);
  }

  addToCart(productId: string) {
    const headers = this.http.getHeader();
    return this.http.postApi(
      `bookstore_user/add_cart_item/${productId}`,
      {},
      headers
    );
  }

  updateCartQuantity(cartItemId: string, quantity: number) {
    const headers = this.http.getHeader();
    return this.http.putApi(
      `bookstore_user/cart_item_quantity/${cartItemId}`,
      { quantityToBuy: quantity }, // ✅ use correct key
      headers
    );
  }

  removeFromCart(cartItemId: string) {
    const headers = this.http.getHeader();
    return this.http.deleteApi(
      `bookstore_user/remove_cart_item/${cartItemId}`,
      headers
    );
  }

  getFeedback(productId: string) {
    const headers = this.http.getHeader();
    return this.http.getApi(
      `bookstore_user/get/feedback/${productId}`,
      headers
    );
  }

  addFeedback(productId: string, payload: { comment: string; rating: number }) {
    const headers = this.http.getHeader();
    return this.http.postApi(
      `bookstore_user/add/feedback/${productId}`,
      payload,
      headers
    );
  }

  addOrder(orderPayload: {
    orders: {
      product_id: string;
      product_name: string;
      product_quantity: number;
      product_price: number;
    }[];
  }) {
    const headers = this.http.getHeader(); // Assumes token header setup
    return this.http.postApi('bookstore_user/add/order', orderPayload, headers);
  }

  getWishlistItems() {
    const headers = this.http.getHeader();
    return this.http.getApi('bookstore_user/get_wishlist_items', headers);
  }

  addToWishlist(productId: string) {
    const headers = this.http.getHeader();
    return this.http.postApi(
      `bookstore_user/add_wish_list/${productId}`,
      {},
      headers
    );
  }

  removeFromWishlist(productId: string) {
    const headers = this.http.getHeader();
    return this.http.deleteApi(
      `bookstore_user/remove_wishlist_item/${productId}`,
      headers
    );
  }
}
