import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { TodoItemInput } from '../../types/todoItemInput';
import { ITodoItemInput } from '../../../../../common/models/todoItem';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'ngt-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  earliestDate: Date;
  Title: string;
  Description?: string;
  dueDate: Date;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.earliestDate = new Date();
  }

  Add(): void {
    const todo: ITodoItemInput = new TodoItemInput();
    todo.Completed = false;
    todo.Id = Guid.create().toString();
    todo.CreationDate = new Date();
    todo.Title = this.Title;
    todo.Description = this.Description;
    todo.DueDate = this.dueDate;

    this.apollo.mutate({
      mutation: gql`
        mutation Add($input: TodoItemInput!) {
          Add(TodoItem: $input) {
            Title
          }
        }
      `,
      variables: {
        input: todo
      }
    }).subscribe();
    this.Reset();
  }

  private Reset(): void {
    this.Title = '';
    this.Description = '';
    this.dueDate = null;
  }

}
