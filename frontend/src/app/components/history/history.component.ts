import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../../services/history/history.service';

interface Prompt {
  topic: string;
  subTopic: string;
  prompt: string;
  response: string;
  createdAt: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  prompts: Prompt[] = [];
  loading = true;
  error = '';

  constructor(private historyService: HistoryService) {}

  ngOnInit() {
    this.historyService.getUserPrompts().subscribe({
      next: (prompts: Prompt[]) => {
        this.prompts = prompts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load history';
        this.loading = false;
      }
    });
  }

}