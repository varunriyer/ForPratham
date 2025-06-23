import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent {
  orders = [
    {
      title: "Don't Make Me Think",
      author: 'Steve Krug',
      price: 1500,
      originalPrice: 2000,
      imageUrl: 'assets/book1.png',
      date: 'May 21',
    },
    {
      title: 'React Material-UI',
      author: 'Cookbook',
      price: 780,
      originalPrice: 1000,
      imageUrl: 'assets/book2.png',
      date: 'April 06',
    },
  ];
}
