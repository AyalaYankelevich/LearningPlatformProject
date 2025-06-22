import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component'; // Import HomeComponent
import { LogInComponent } from './components/logIn/logIn.component'; // Import LogInComponent
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { TopicSelectorComponent } from './components/topic-selector/topic-selector.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HomeComponent, // Import HomeComponent directly
    LogInComponent, // Import LogInComponent directly
    UserDashboardComponent,
    TopicSelectorComponent,
    FormsModule, // Import FormsModule for template-driven forms
    AppRoutingModule
    ],
  providers: []
})
export class AppModule { }


