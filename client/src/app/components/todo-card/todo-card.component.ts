import { EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { TodoItemInput } from 'src/app/types/todoItemInput';
import { ITodoItem, ITodoItemInput } from '../../../../../Common/models/todoItem';

@Component({
  selector: 'ngt-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  earliestDate: Date;
  private inEdit = false;

  @Input() todo: ITodoItem;
  @Output() deleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.earliestDate = new Date();
  }

  Edit(inEdit: boolean) {
    this.inEdit = inEdit;
  }

  get InEdit(): boolean {
    return this.inEdit;
  }

  Delete() : void {
    this.apollo.mutate({
      mutation: gql`
        mutation Remove($Id: String!) {
          Remove(Id: $Id)
        }
      `, variables: {Id: this.todo.Id}
    }).subscribe();
    this.deleted.emit(this.todo.Id);
  }

  Complete(): void {
    this.apollo.mutate({
      mutation: gql`
        mutation Complete($input: String!) {
          Complete(Id: $input)
        }
      `,
      variables: {input: this.todo.Id}
    }).subscribe();
    this.todo.Completed = true;
    this.Edit(false);
  }

  Save(): void {
    const todo: ITodoItemInput = new TodoItemInput();
    todo.Completed = false;
    todo.CreationDate = new Date();
    todo.Title = this.todo.Title;
    todo.Description = this.todo.Description;
    todo.DueDate = this.todo.DueDate;
    todo.Id = this.todo.Id;
    this.apollo.mutate({
      mutation: gql`
        mutation Update($input: TodoItemInput!) {
          Update(TodoItem: $input)
        }
      `,
      variables: {input: todo}
    }).subscribe();
    this.Edit(false);
  }
}
