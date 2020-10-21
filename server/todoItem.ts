import 'reflect-metadata';
import { Arg, Field, FieldResolver, ID, InputType, Int, Mutation, ObjectType, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { TodoDataAccess } from './databaseAccess';
import { Prefill } from "./prefill";
import { ITodoSchema } from './schema';

@ObjectType({ description: 'To-do Item' })
export class TodoItem {
    @Field(type=>ID)
    Id: string = "";

    @Field({ nullable: true, description: 'Description of an item'})
    Description?: string;

    @Field({ nullable: true, description: 'Due date of an item'})
    DueDate?: Date;

    @Field({ nullable: true, description: 'Creation date of an item'})
    CreationDate: Date;

    @Field()
    Title: string;

    @Field(type=>Int)
    DaysCreated: number;

    @Field()
    Completed: boolean;
}

@InputType()
export class TodoItemInput implements Partial<TodoItem> {
    @Field()
    Id: string = "";

    @Field({ nullable: true, description: 'Description of an item'})
    Description?: string;

    @Field({ nullable: true, description: 'Due date of an item'})
    DueDate?: Date;

    @Field({ nullable: true, description: 'Creation date of an item'})
    CreationDate: Date;

    @Field()
    Title: string;

    @Field()
    Completed: boolean; 
}

@Resolver(() => TodoItem)
export class TodoItemResolver implements ResolverInterface<TodoItem> {
    private readonly miliSecondsPerDay = 60 * 60 * 24 *1000;
    private readonly dataAccess: TodoDataAccess = new TodoDataAccess();

    @FieldResolver()
    DaysCreated(@Root() todoItem: TodoItem): number {
        const value = this.GetDateDifference([new Date(), todoItem.CreationDate]);
        if (value === 0) {
            return 0;
        }
        return Math.round(value / this.miliSecondsPerDay);
    }

    @Query(() => [TodoItem], { description: 'Get all to-do items' })
    async TodoItems(): Promise<TodoItem[]> {
        return await Prefill.Instance.Items;
    }

    @Query(() => [TodoItem], { description: 'Get all expired items' })
    async OverdueTodoItems(): Promise<TodoItem[]> {
        const result = new Array<TodoItem>();
        const testDate = new Date();
        await Prefill.Instance.Items.forEach(item => {
            if (item.DueDate! < testDate && !item.Completed) {
                result.push(item);
            }
        });
        return result;
    }

    @Mutation(() => TodoItem)
    async Add(@Arg("TodoItem") todoItemInput: TodoItemInput): Promise<TodoItem> {
        const todoItem = <TodoItem> {
            Id : todoItemInput.Id,
            CreationDate : todoItemInput.CreationDate,
            DueDate : todoItemInput.DueDate,
            Description : todoItemInput.Description,
            Title : todoItemInput.Title,
            Completed : todoItemInput.Completed
        };

        todoItem.Completed = false;
        await Prefill.Instance.Items.push(todoItem);
        await this.dataAccess.Add(this.CreateTodoSchema(todoItem));
        return todoItem;
    }

    @Mutation(() => Boolean!)
    async Update(@Arg("TodoItem") todoItemInput: TodoItemInput): Promise<boolean> {
        const item: TodoItem = await Prefill.Instance.Items.find(x => x.Id === todoItemInput.Id)!;
        if (!item) {
            return false;
        }
        item.Title = todoItemInput.Title;
        item.Description = todoItemInput.Description;
        item.DueDate = todoItemInput.DueDate;
        this.dataAccess.Update(item.Id, this.CreateTodoSchema(item));
        return true;
    }

    @Mutation(() => Boolean!)
    async Remove(@Arg("Id") id: string): Promise<boolean> {
        const index = Prefill.Instance.Items.findIndex(x => x.Id === id);
        if (index < 0) {
            return false;
        }
        Prefill.Instance.Items.splice(index, 1);
        await this.dataAccess.Remove(id);
        return true;
    }

    @Mutation(() => Boolean!)
    async Complete(@Arg("Id") id: string): Promise<boolean> {
        const item: TodoItem = Prefill.Instance.Items.find(x => x.Id === id)!;
        if (!item) {
            return false;
        }
        item.Completed = true;
        await this.dataAccess.Update(id, this.CreateTodoSchema(item));
        return true;
    }

    private CreateTodoSchema<T extends TodoItem | TodoItemInput> (todoItem: T): ITodoSchema {
        return <ITodoSchema> {
            Id: todoItem.Id,
            CreationDate: todoItem.CreationDate,
            DueDate: todoItem.DueDate,
            Description: todoItem.Description,
            Title: todoItem.Title,
            Completed: todoItem.Completed
        };
    }

    private GetDateDifference(args: [Date, Date]): number {
        return Math.round(args[0].valueOf() - args[1].valueOf());
    }
}