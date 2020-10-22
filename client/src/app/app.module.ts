import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { Apollo } from 'apollo-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { OverdueTasksComponent } from './components/overdue-tasks/overdue-tasks.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    AllTasksComponent,
    OverdueTasksComponent,
    TodoCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatNativeDateModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    HttpLinkModule,
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
