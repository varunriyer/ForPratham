import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'forgot-password', component: ForgotpassComponent },
      {
        path: 'book/:id',
        loadComponent: () =>
          import('./pages/book-details/book-details.component').then(
            (m) => m.BookDetailsComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'order-success',
        loadComponent: () =>
          import('./pages/order-success/order-success.component').then(
            (m) => m.OrderSuccessComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/orders/orders.component').then(
            (m) => m.OrdersComponent
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
    ],
  },
  {
    path: 'login',
    component: RegisterComponent,
  },
];
