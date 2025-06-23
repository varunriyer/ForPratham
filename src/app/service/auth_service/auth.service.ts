import { Injectable } from '@angular/core';
import { HttpService } from '../http_service/http.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpService) {}

  signUp(payload: any) {
    return this.http.postApi('bookstore_user/registration', payload).pipe(
      tap((res: any) => {
        if (res?.success && res.result?.fullName) {
          // Store entire user object
          localStorage.setItem('user', JSON.stringify(res.result));
          // Also store fullName separately for backward compatibility (optional)
          localStorage.setItem('fullName', res.result.fullName);
        }
      })
    );
  }

  login(payload: any) {
    return this.http.postApi('bookstore_user/login', payload);
  }
}
