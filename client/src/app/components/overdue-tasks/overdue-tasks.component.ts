import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { OverdueTodoItemQuery, SubscriptionBase } from 'src/app/types/subscriptionBase';
import { ITodoItem } from '../../../../../Common/models/todoItem';

@Component({
  selector: 'ngt-overdue-tasks',
  templateUrl: './overdue-tasks.component.html',
  styleUrls: ['./overdue-tasks.component.scss']
})
export class OverdueTasksComponent extends SubscriptionBase implements OnInit {

  constructor(apollo: Apollo) {
    super(apollo);
  }

  ngOnInit(): void {
    this.Subscribe<OverdueTodoItemQuery>(gql`query ItemsQuery {
      OverdueTodoItems {
        Id,
        Title,
        Description,
        DaysCreated,
        DueDate,
        Completed
      }
    }`).subscribe(itemList => {
      this.todos = new Array<ITodoItem>();
      itemList.data.OverdueTodoItems.forEach(x => {
          this.todos.push(x);
      });
     
    })
  }

}
