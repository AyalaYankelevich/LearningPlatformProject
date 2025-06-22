import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-use-dashboard',
  templateUrl: './user-dashboard.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  firstName = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.firstName = localStorage.getItem('firstName') || '';
  }

  onLearningClick() {
    this.router.navigate(['/topics']); // <-- Navigate to the TopicSelectorComponent
  }

  onHistoryClick() {
     this.router.navigate(['/history']); // <-- Navigate to the HistoryComponent
  }
}