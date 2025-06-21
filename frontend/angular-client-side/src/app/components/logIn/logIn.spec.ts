import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogInComponent } from './logIn';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('LogInComponent', () => {
  let component: LogInComponent;
  let fixture: ComponentFixture<LogInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInComponent, HttpClientTestingModule, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LogInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the LogInComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login form with email and password fields', () => {
    expect(component.loginForm.contains('email')).toBeTrue();
    expect(component.loginForm.contains('password')).toBeTrue();
  });

  it('should have a signup form with required fields', () => {
    expect(component.signupForm.contains('firstName')).toBeTrue();
    expect(component.signupForm.contains('lastName')).toBeTrue();
    expect(component.signupForm.contains('id')).toBeTrue();
    expect(component.signupForm.contains('email')).toBeTrue();
    expect(component.signupForm.contains('password')).toBeTrue();
  });
});