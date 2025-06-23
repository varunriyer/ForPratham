import { Component, OnInit } from '@angular/core';
import { BookCardComponent } from '../../components/book-card/book-card.component';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BookService } from '../../service/book_service/book.service';

@Component({
  selector: 'app-home',
  imports: [BookCardComponent, CommonModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  books: any[] = [];
  displayedBooks: any[] = [];
  pageSize = 10;
  currentPage = 0;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        this.books = res.result;
        console.log('Books:', this.books);
        this.updateDisplayedBooks();
      },
      error: (err) => {
        console.error('Failed to fetch books', err);
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updateDisplayedBooks();
  }

  updateDisplayedBooks() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.displayedBooks = this.books.slice(start, end);
  }
}
