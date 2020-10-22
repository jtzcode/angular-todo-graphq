import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { SubscriptionBase, TodoItemQuery } from 'src/app/types/subscriptionBase';
import { ITodoItem } from '../../../../../Common/models/todoItem';

@Component({
  selector: 'ngt-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent extends SubscriptionBase implements OnInit {

  constructor(apollo: Apollo) {
    super(apollo);
  }

  ngOnInit(): void {
    this.Subscribe<TodoItemQuery>(gql`query ItemsQuery {
      TodoItems {
        Id,
        Title,
        Description,
        DaysCreated,
        DueDate,
        Completed
      }
    }`).subscribe(todo => {
      this.todos = new Array<ITodoItem>();
      todo.data.TodoItems.forEach(x => {
        this.todos.push(x);
      });
    });
  }

}
