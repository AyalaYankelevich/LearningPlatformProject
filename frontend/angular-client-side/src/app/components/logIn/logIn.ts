// // import { Component } from '@angular/core';
// // import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// // import { HttpClient } from '@angular/common/http';
// // import { CommonModule } from '@angular/common';

// // @Component({
// //   selector: 'app-log-in',
// //   standalone: true,
// //   imports: [ReactiveFormsModule, CommonModule],
// //   templateUrl: './logIn.html',
// //   styleUrls: ['./logIn.css']
// // })
// // export class LogInComponent {
// //   // For /api/hello test
// //   message = '';

// //   // UI
// //   isLogin = true;
// //   authMsg = '';
// //   loading = false;

// //   // Login and Signup forms (declare first, assign in constructor)
// //   loginForm: any;
// //   signupForm: any;

// //   constructor(private fb: FormBuilder, private http: HttpClient) {
// //     // Initialize forms here, after fb is available
// //     this.loginForm = this.fb.group({
// //       email: ['', [Validators.required, Validators.email]],
// //       password: ['', [Validators.required]]
// //     });

// //     this.signupForm = this.fb.group({
// //       firstName: ['', Validators.required],
// //       lastName: ['', Validators.required],
// //       id: ['', Validators.required],
// //       email: ['', [Validators.required, Validators.email]],
// //       password: ['', Validators.required]
// //     });

// //     // Test hello
// //     this.http.get<{message: string}>('http://localhost:5059/api/hello').subscribe(
// //       res => this.message = res.message,
// //       err => this.message = 'Error connecting to backend'
// //     );
// //   }

// //   toggleForm() {
// //     this.isLogin = !this.isLogin;
// //     this.authMsg = '';
// //   }

// //   onLogin() {
// //     if (this.loginForm.invalid) return;
// //     this.loading = true;
// //     this.http.post<{token: string}>('http://localhost:5059/api/auth/login', this.loginForm.value)
// //       .subscribe({
// //         next: res => {
// //           this.authMsg = 'Login successful! 🎉';
// //           this.loading = false;
// //           // Optionally: save token and redirect
// //         },
// //         error: err => {
// //           this.authMsg = err.error?.message || 'Login failed';
// //           this.loading = false;
// //         }
// //       });
// //   }

// //   onSignup() {
// //     if (this.signupForm.invalid) return;
// //     this.loading = true;
// //     this.http.post<{token: string}>('http://localhost:5059/api/auth/register', this.signupForm.value)
// //       .subscribe({
// //         next: res => {
// //           this.authMsg = 'Signup successful! 🎉 You can now log in.';
// //           this.loading = false;
// //           this.isLogin = true;
// //         },
// //         error: err => {
// //           this.authMsg = err.error?.message || 'Signup failed';
// //           this.loading = false;
// //         }
// //       });
// //   }
// // }
// import { Component } from '@angular/core';
// import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-log-in',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './logIn.html',
//   styleUrls: ['./logIn.css']
// })
// export class LogInComponent {
//   message = '';
//   isLogin = true;
//   authMsg = '';
//   loading = false;

//   loginForm: any;
//   signupForm: any;

//   constructor(private fb: FormBuilder, private http: HttpClient) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]]
//     });

//     this.signupForm = this.fb.group({
//       firstName: ['', Validators.required],
//       lastName: ['', Validators.required],
//       id: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });

//     this.http.get<{message: string}>('http://localhost:5059/api/hello').subscribe(
//       res => this.message = res.message,
//       err => this.message = 'Error connecting to backend'
//     );
//   }

//   toggleForm() {
//     this.isLogin = !this.isLogin;
//     this.authMsg = '';
//   }

//   onLogin() {
//     if (this.loginForm.invalid) return;
//     this.loading = true;
//     this.http.post<{token: string}>('http://localhost:5059/api/auth/login', this.loginForm.value)
//       .subscribe({
//         next: res => {
//           this.authMsg = 'Login successful! 🎉';
//           this.loading = false;
//         },
//         error: err => {
//           this.authMsg = err.error?.message || 'Login failed';
//           this.loading = false;
//         }
//       });
//   }

//   onSignup() {
//     if (this.signupForm.invalid) return;
//     this.loading = true;
//     this.http.post<{token: string}>('http://localhost:5059/api/auth/register', this.signupForm.value)
//       .subscribe({
//         next: res => {
//           this.authMsg = 'Signup successful! 🎉 You can now log in.';
//           this.loading = false;
//           this.isLogin = true;
//         },
//         error: err => {
//           this.authMsg = err.error?.message || 'Signup failed';
//           this.loading = false;
//         }
//       });
//   }
// }
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './logIn.html',
  styleUrls: ['./logIn.css']
})
export class LogInComponent {
  message = '';
  isLogin = true;
  authMsg = '';
  loading = false;

  loginForm: any;
  signupForm: any;

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
          this.authMsg = 'Login successful! 🎉';
          this.loading = false;
          // Optionally: save token and redirect
        },
        error: err => {
          this.authMsg = err.error?.message || 'Login failed';
          this.loading = false;
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
          this.authMsg = 'Signup successful! 🎉 You can now log in.';
          this.loading = false;
          this.isLogin = true;
        },
        error: err => {
          this.authMsg = err.error?.message || 'Signup failed';
          this.loading = false;
        }
      });
  }
}