import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PromptService } from '../../services/prompt/prompt.service';
import { TopicsService } from '../../services/topics/topics.service';

@Component({
  selector: 'app-prompt-gpt',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.css']
})
export class PromptComponent {
  userMessage = '';
  gptResponse = '';
  loading = false;
  error = '';
  topicId = '';
  subTopicId = '';
  topic = '';
  subTopic = '';
  topicLoaded = false;
  subTopicLoaded = false;

  constructor(
    private promptService: PromptService,
    private topicService: TopicsService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.topicLoaded = false;
      this.subTopicLoaded = false;
      this.topicId = params.get('topicId') || '';
      this.subTopicId = params.get('subTopicId') || '';
      // Fetch and assign topic and subtopic titles
      this.topicService.getTopicTitleById(this.topicId).subscribe(title => {
        this.topic = title;
        this.topicLoaded = true;
      });
      this.topicService.getSubTopicTitleById(this.subTopicId).subscribe(title => {
        this.subTopic = title;
        this.subTopicLoaded = true;
      });
    });
  }

  // goBack() {
  //   this.router.navigate(['/topics']);
  // }

  sendPrompt() {
  if (this.loading) return;

  this.error = '';
  this.gptResponse = '';
  if (
    !this.userMessage.trim() ||
    !this.topicLoaded ||
    !this.subTopicLoaded ||
    !this.topic.trim() ||
    !this.subTopic.trim()
  ) {
    this.error = 'Please enter your prompt and wait for topic/sub-topic to load.';
    return;
  }
  this.loading = true;
  this.promptService.generatePrompt(this.userMessage, this.topic, this.subTopic)
    .subscribe({
      next: (res) => {
        console.log('GPT backend response:', res);
        this.gptResponse = res?.response || "(No answer returned)";
        this.loading = false;
        this.promptService.savePrompt(
          this.userMessage,
          this.gptResponse,
          this.topicId,
          this.subTopicId
        ).subscribe();
      },
      
      error: (err) => {
        this.error = 'Error communicating with GPT service.';
        this.loading = false;
        // Debug output:
        console.error('Error from GPT service:', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
}
}