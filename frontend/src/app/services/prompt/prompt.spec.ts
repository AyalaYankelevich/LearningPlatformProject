import { TestBed } from '@angular/core/testing';
import { PromptService } from './prompt.service';

describe('Prompt', () => {
  let service: PromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
