import { ApolloQueryResult, gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { ITodoItem } from '../../../../Common/models/todoItem';
import { Observable } from 'rxjs';

export class SubscriptionBase {
    todos: ITodoItem[] = new Array<ITodoItem>();
    constructor(private apollo: Apollo) {

    }
    protected Subscribe<T extends OverdueTodoItemQuery | TodoItemQuery>(gqlQuery: any): Observable<ApolloQueryResult<T>> {
        return this.apollo.query<T>({
            query: gqlQuery,
            fetchPolicy: 'no-cache'
        });
    }
    Resubscribe = (e: string) => {
        const index = this.todos.findIndex(x => x.Id === e);
        this.todos.splice(index, 1);
    }
}

export interface TodoItemQuery {
    // The name of the property is going to map back to the name in the query
    TodoItems: ITodoItem[];
  }
  
export interface OverdueTodoItemQuery {
    OverdueTodoItems: ITodoItem[];
}   