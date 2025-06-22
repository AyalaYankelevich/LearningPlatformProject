
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/adminDashboard/admin-dashboard.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
  prompts: any[] = [];
  view: 'none' | 'users' | 'prompts' = 'none';
  loading = false;
  error = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {}

  showUsers() {
    this.loading = true;
    this.error = '';
    this.view = 'users';
    this.adminService.getAllUsers().subscribe({
      next: users => { this.users = users; this.loading = false; },
      error: err => { this.error = 'Failed to load users.'; this.loading = false; }
    });
  }

showPrompts() {
  this.loading = true;
  this.error = '';
  this.view = 'prompts';
  this.adminService.getAllPrompts().subscribe({
    next: prompts => { 
      this.prompts = prompts; 
      this.loading = false; 
    },
    error: err => { 
      this.error = 'Failed to load prompts.'; 
      this.loading = false; 
    }
  });
}

  hideAll() {
    this.view = 'none';
    this.error = '';
  }
}