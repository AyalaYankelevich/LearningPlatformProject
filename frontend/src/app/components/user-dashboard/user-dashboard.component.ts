import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service'; // Assuming you have an AuthService to get user profile

@Component({
  selector: 'app-use-dashboard',
  templateUrl: './user-dashboard.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  userName = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {

}

  onLearningClick() {
    this.router.navigate(['/topics']); // <-- Navigate to the TopicSelectorComponent
  }

  onHistoryClick() {
     this.router.navigate(['/history']); // <-- Navigate to the HistoryComponent
  }
}