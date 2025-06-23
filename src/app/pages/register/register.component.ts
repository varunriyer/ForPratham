import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth_service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  selectedTab: 'login' | 'signup' = 'login';
  showPassword = false;
  loginForm!: FormGroup;
  signUpForm!: FormGroup;

  get isLogin(): boolean {
    return this.selectedTab === 'login';
  }

  get isSignup(): boolean {
    return this.selectedTab === 'signup';
  }

  get emailControl() {
    return this.isLogin
      ? this.loginForm.get('email')
      : this.signUpForm.get('email');
  }

  get passwordControl() {
    return this.isLogin
      ? this.loginForm.get('password')
      : this.signUpForm.get('password');
  }

  get nameControl() {
    return this.signUpForm.get('fullName');
  }

  get mobileControl() {
    return this.signUpForm.get('phone');
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
    });

    this.signUpForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern('^[A-Za-z ]+$'),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });

    this.route.queryParams.subscribe((params) => {
      if (params['tab'] === 'signup') {
        this.selectedTab = 'signup';
      }
    });
  }

  onSignUp() {
    if (this.signUpForm.valid) {
      const payload = this.signUpForm.value;
      this.auth.signUp(payload).subscribe({
        next: (response) => {
          console.log('Sign up successful', response);
          this.selectedTab = 'login';
        },
        error: (err) => {
          console.error('Sign up failed', err);
        },
      });
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value;
      this.auth.login(payload).subscribe({
        next: (response: any) => {
          console.log('Login successful', response);
          localStorage.setItem('token', response.result.accessToken);
          this.router.navigate(['/home']);
        },
      });
    }
  }
}
