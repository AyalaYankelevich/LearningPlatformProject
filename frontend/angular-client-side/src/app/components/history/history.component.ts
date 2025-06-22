import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PromptService } from '../../services/prompt/prompt.service';

interface Prompt {
  topic: string;
  subTopic: string;
  prompt: string;
  response: string;
  createdAt: string;
}

interface GroupedHistory {
  topic: string;
  subTopics: { subTopic: string; prompts: Prompt[] }[];
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  groupedHistory: GroupedHistory[] = [];
  loading = true;
  error = '';

  constructor(private promptService: PromptService) {}

  ngOnInit() {
    this.promptService.getUserPrompts().subscribe({
      next: (prompts: Prompt[]) => {
        this.groupedHistory = this.groupPrompts(prompts);
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load history';
        this.loading = false;
      }
    });
  }

  // Group prompts by topic and subTopic
  groupPrompts(prompts: Prompt[]): GroupedHistory[] {
    const topicMap = new Map<string, GroupedHistory>();

    for (const p of prompts) {
      if (!topicMap.has(p.topic)) {
        topicMap.set(p.topic, { topic: p.topic, subTopics: [] });
      }
      const topicGroup = topicMap.get(p.topic)!;

      let subGroup = topicGroup.subTopics.find(st => st.subTopic === p.subTopic);
      if (!subGroup) {
        subGroup = { subTopic: p.subTopic, prompts: [] };
        topicGroup.subTopics.push(subGroup);
      }
      subGroup.prompts.push(p);
    }
    return Array.from(topicMap.values());
  }
}