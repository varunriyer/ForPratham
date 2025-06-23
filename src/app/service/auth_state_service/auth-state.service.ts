import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  constructor() {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
