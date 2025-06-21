import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';

import { HomeComponent } from './components/home/home'; // Import HomeComponent
import { LogInComponent } from './components/logIn/logIn'; // Import LogInComponent
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HomeComponent, // Import HomeComponent directly
    LogInComponent, // Import LogInComponent directly
    UserDashboardComponent,
    AppRoutingModule
    ],
  providers: []
})
export class AppModule { }


