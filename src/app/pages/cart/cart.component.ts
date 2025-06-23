import { Component, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../service/book_service/book.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems = signal<any[]>([]);
  selectedAddress: any = null;
  currentStep = signal(1);
  fullName = '';
  phone = '';

  constructor(private bookService: BookService, private router: Router) {
    this.loadCartItems();
  }
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fullName = user.fullName || 'Guest';
    this.phone = user.phone || '9876543210';
  }

  loadCartItems() {
    this.bookService.getCartItems().subscribe((res: any) => {
      this.cartItems.set(res.result);
    });
  }

  incrementQty(item: any) {
    if (item.product_id.quantity >= item.quantityToBuy + 1) {
      this.bookService
        .updateCartQuantity(item._id, item.quantityToBuy + 1)
        .subscribe(() => this.loadCartItems());
    }
  }

  decrementQty(item: any) {
    if (item.quantityToBuy > 1) {
      this.bookService
        .updateCartQuantity(item._id, item.quantityToBuy - 1)
        .subscribe(() => this.loadCartItems());
    }
  }

  removeItem(itemId: string) {
    this.bookService
      .removeFromCart(itemId)
      .subscribe(() => this.loadCartItems());
  }

  nextStep() {
    this.currentStep.update((s) => s + 1);
  }

  placeOrder() {
    const orders = this.cartItems().map((item) => ({
      product_id: item.product_id._id,
      product_name: item.product_id.bookName,
      product_quantity: item.quantityToBuy, // ✅ use quantityToBuy
      product_price: item.product_id.discountPrice,
    }));

    this.bookService.addOrder({ orders }).subscribe((res: any) => {
      // ✅ Store response in localStorage
      localStorage.setItem('lastOrder', JSON.stringify(res.result || orders));

      // ✅ Navigate to order-success page
      this.router.navigate(['/home/order-success']);
    });
  }
}
