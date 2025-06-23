import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { AuthStateService } from '../../service/auth_state_service/auth-state.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from '../../pages/register/register.component';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-appbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatDividerModule,
    MatDialogModule,
    RegisterComponent,
    RouterModule,
  ],
  templateUrl: './appbar.component.html',
  styleUrl: './appbar.component.css',
})
export class AppbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  firstName: string = 'Profile';
  fullName: string = 'User';

  constructor(
    private authState: AuthStateService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authState.isLoggedIn();

    if (this.isLoggedIn) {
      const user = localStorage.getItem('user');
      if (user) {
        this.fullName = JSON.parse(user).fullName.trim();
        this.firstName = this.fullName.split(' ')[0];
      }
    }
  }

  goToLogin() {
    this.dialog.open(RegisterComponent, {
      width: '750px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      disableClose: false,
      autoFocus: false,
    });
  }

  goToCart() {
    this.router.navigate(['/home/cart']);
  }

  goToOrders() {
    this.router.navigate(['/home/orders']);
  }

  goToProfile() {
    this.router.navigate(['/home/profile']);
  }

  goToWishlist() {
    this.router.navigate(['/home/wishlist']);
  }
}
