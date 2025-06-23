import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../service/book_service/book.service';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { AuthStateService } from '../../service/auth_state_service/auth-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule, MatIconModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  bookId: string | null = null;
  book: any;
  isInCart = false;
  quantity = 1;
  cartItemId: string | null = null;

  // Feedback
  feedbackList: any[] = [];
  newRating = 0;
  newComment = '';
  isInWishlist = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private auth: AuthStateService
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id');

    this.bookService.getAllBooks().subscribe((res: any) => {
      this.book = res.result.find((b: any) => b._id === this.bookId);
    });

    this.loadFeedback();
    this.checkCartState();
    this.checkWishlistState();
  }

  loadFeedback() {
    if (this.bookId) {
      this.bookService.getFeedback(this.bookId).subscribe((res: any) => {
        this.feedbackList = res.result;
      });
    }
  }

  submitFeedback() {
    if (!this.auth.isLoggedIn() || !this.bookId) return;

    const payload = { comment: this.newComment, rating: this.newRating };
    this.bookService.addFeedback(this.bookId, payload).subscribe(() => {
      this.newRating = 0;
      this.newComment = '';
      this.loadFeedback();
    });
  }

  selectRating(star: number) {
    this.newRating = star;
  }

  checkCartState() {
    this.bookService.getCartItems().subscribe((res: any) => {
      const item = res.result.find(
        (i: any) => i.product_id._id === this.bookId
      );
      if (item) {
        this.isInCart = true;
        this.quantity = item.quantityToBuy;
        this.cartItemId = item._id;
      }
    });
  }

  addToCart() {
    if (this.bookId) {
      this.bookService.addToCart(this.bookId).subscribe(() => {
        this.isInCart = true;
        this.checkCartState();
      });
    }
  }

  updateQty(change: number) {
    if (!this.cartItemId) return;
    const newQty = this.quantity + change;
    if (newQty < 1) return;

    this.bookService
      .updateCartQuantity(this.cartItemId, newQty)
      .subscribe(() => {
        this.quantity = newQty;
      });
  }

  checkWishlistState() {
    this.bookService.getWishlistItems().subscribe((res: any) => {
      this.isInWishlist = res.result.some(
        (item: any) => item._id === this.bookId
      );
    });
  }

  toggleWishlist() {
    if (!this.bookId) return;

    if (this.isInWishlist) {
      this.bookService.removeFromWishlist(this.bookId).subscribe(() => {
        this.isInWishlist = false;
      });
    } else {
      this.bookService.addToWishlist(this.bookId).subscribe(() => {
        this.isInWishlist = true;
      });
    }
  }
}
