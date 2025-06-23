import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../service/book_service/book.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  wishlistItems = signal<any[]>([]);

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    this.bookService.getWishlistItems().subscribe((res: any) => {
      this.wishlistItems.set(res.result);
    });
  }

  removeFromWishlist(productId: string) {
    this.bookService.removeFromWishlist(productId).subscribe(() => {
      this.loadWishlist();
    });
  }
}
