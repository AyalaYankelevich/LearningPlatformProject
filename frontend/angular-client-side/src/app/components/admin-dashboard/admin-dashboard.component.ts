import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/adminDashboard/admin-dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  prompts: any[] = [];
  view!: 'none' | 'users' | 'prompts' | 'add-admin';
  loading = false;
  error = '';

  signupForm!: FormGroup;
  createAdminLoading = false;
  createAdminSuccess = '';
  createAdminError = '';

  constructor(private adminService: AdminService, private fb: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  showUsers() {
    this.view = 'users';
    this.loading = true;
    this.error = '';
    this.adminService.getAllUsers().subscribe({
      next: users => { this.users = users; this.loading = false; },
      error: err => { this.error = 'Failed to load users.'; this.loading = false; }
    });
  }

  showPrompts() {
    this.view = 'prompts';
    this.loading = true;
    this.error = '';
    this.adminService.getAllPrompts().subscribe({
      next: prompts => { this.prompts = prompts; this.loading = false; },
      error: err => { this.error = 'Failed to load prompts.'; this.loading = false; }
    });
  }

  showCreateAdmin() {
    this.view = 'add-admin';
    this.createAdminSuccess = '';
    this.createAdminError = '';
    this.signupForm.reset();
  }

  hideAll() {
    this.view = 'none';
    this.error = '';
    this.createAdminSuccess = '';
    this.createAdminError = '';
  }

  submitCreateAdmin() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    this.createAdminLoading = true;
    this.createAdminSuccess = '';
    this.createAdminError = '';
    this.adminService.createAdmin(this.signupForm.value).subscribe({
      next: res => {
        this.createAdminLoading = false;
        this.createAdminSuccess = 'Admin created successfully!';
        this.showUsers();
      },
      error: err => {
        this.createAdminLoading = false;
        this.createAdminError = err.error?.message || 'Failed to create admin.';
      }
    });
  }
}