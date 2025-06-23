import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  imports: [CommonModule, MatCardModule],
  templateUrl: './forgotpass.component.html',
  styleUrl: './forgotpass.component.css',
})
export class ForgotpassComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['login'], { queryParams: { tab: 'signup' } });
  }
}
