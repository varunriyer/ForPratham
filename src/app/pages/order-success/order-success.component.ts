import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit {
  orderId: string | null = null;
  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedOrder = localStorage.getItem('lastOrder');
    if (storedOrder) {
      const orderData = JSON.parse(storedOrder);
      this.orderId = orderData[0]?._id || null;
    }
  }

  continueShopping() {
    this.router.navigate(['/home']);
  }
}
