import { TestBed } from '@angular/core/testing';
import { TopicsService } from './topics.service';

describe('Topics', () => {
  let service: TopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
