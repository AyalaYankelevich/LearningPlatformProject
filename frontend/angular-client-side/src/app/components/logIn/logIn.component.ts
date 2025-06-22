import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './logIn..component.html',
  styleUrls: ['./logIn..component.css']
})
export class LogInComponent {
  message = '';
  isLogin = true;
  authMsg = '';
  loading = false;

  loginForm: any;
  signupForm: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.authMsg = '';
  }

  onLogin() {
    if (this.loginForm.invalid) return;
    this.loading = true;
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password)
      .subscribe({
        next: res => {
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
          // Store firstName if you want, but usually you get it from backend
          this.authMsg = 'Login successful! 🎉';
          this.loading = false;
          if (res.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
        },
        error: err => {
          const msg = err.error?.message || 'Login failed';
          if (msg.toLowerCase().includes('not exist') || msg.toLowerCase().includes('no such user')) {
            this.authMsg = "User doesn't exist. Please sign up!";
            this.loading = false;
            this.isLogin = false; // Switch to sign up form!
          } else {
            this.authMsg = msg;
            this.loading = false;
          }
        }
      });
  }

  onSignup() {
    if (this.signupForm.invalid) return;
    this.loading = true;
    const { firstName, lastName, id, email, password } = this.signupForm.value;
    this.authService.register(firstName, lastName, id, email, password)
      .subscribe({
        next: res => {
          // Store JWT token if present
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
          // Store firstName for greeting
          // localStorage.setItem('firstName', firstName);
          this.authMsg = 'Signup successful! 🎉 Redirecting...';
          this.loading = false;
          if (res.role === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else {
            this.router.navigate(['/user-dashboard']);
          }
        },
        error: err => {
          this.authMsg = err.error?.message || 'Signup failed';
          this.loading = false;
        }
      });
  }
}