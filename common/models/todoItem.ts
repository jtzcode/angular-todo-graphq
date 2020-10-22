
export interface ITodoItem {
    Id: string;
    Title: string;
    Description?: string;
    DueDate?: Date;
    Completed: boolean;
  }

  export interface ITodoItemInput extends ITodoItem {
    CreationDate?: Date;
  }