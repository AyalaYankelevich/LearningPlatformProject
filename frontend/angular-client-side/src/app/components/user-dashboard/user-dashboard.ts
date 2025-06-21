import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-use-dashboard',
  templateUrl: './user-dashboard.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboardComponent implements OnInit {
  firstName = '';

  ngOnInit() {
    this.firstName = localStorage.getItem('firstName') || '';
  }

  onLearningClick() {
    alert('For Learning clicked!');
  }

  onHistoryClick() {
    alert('My History clicked!');
  }
}