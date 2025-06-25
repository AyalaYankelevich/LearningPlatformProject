import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './components/home/home.component'; 
import { LogInComponent } from './components/logIn/logIn.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { TopicSelectorComponent } from './components/topic-selector/topic-selector.component';
import { HistoryComponent } from './components/history/history.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'; 

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HomeComponent,
    LogInComponent,
    UserDashboardComponent,
    TopicSelectorComponent,
    HistoryComponent,
    PromptComponent,
    FormsModule,
    AdminDashboardComponent,
    AppRoutingModule
    ],
  providers: []
})
export class AppModule { }


