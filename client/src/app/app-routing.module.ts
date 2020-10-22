import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { OverdueTasksComponent } from './components/overdue-tasks/overdue-tasks.component';

const routes: Routes = [
  {
    path: 'all',
    component: AllTasksComponent
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch:'full'
  },
  {
    path: 'add',
    component: AddTaskComponent
  },
  {
    path: 'overdue',
    component: OverdueTasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
