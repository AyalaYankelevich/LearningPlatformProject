import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TopicsService } from '../../services/topics/topics.service';


@Component({
  selector: 'app-topic-selector',
  templateUrl: './topic-selector.component.html',
  standalone: true,
  styleUrls: ['./topic-selector.component.css'],
  imports: [CommonModule]
})
export class TopicSelectorComponent implements OnInit {
  topics: any[] = [];
  selectedTopic: any = null;
  subTopics: any[] = [];
  loading = false;

  constructor(private topicsService: TopicsService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.topicsService.getTopics().subscribe(topics => {
      this.topics = topics;
      this.loading = false;
    });
  }

  selectTopic(topic: any) {
    this.selectedTopic = topic;
    this.loading = true;
    this.topicsService.getSubTopicsByTopicId(topic.id).subscribe(subTopics => {
      this.subTopics = subTopics;
      this.loading = false;
    });
  }

  clearSelection() {
    this.selectedTopic = null;
    this.subTopics = [];
  }

  onSubTopicClick(sub: any) {
    this.router.navigate([
      '/prompt',
      this.selectedTopic.id,
      sub.id                 
    ]);
  }
}