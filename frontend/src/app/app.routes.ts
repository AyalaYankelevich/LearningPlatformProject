import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LogInComponent } from './components/logIn/logIn.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { TopicSelectorComponent } from './components/topic-selector/topic-selector.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { HistoryComponent } from './components/history/history.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'topics', component: TopicSelectorComponent },
  { path: 'prompt/:topicId/:subTopicId', component: PromptComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


export { routes };
