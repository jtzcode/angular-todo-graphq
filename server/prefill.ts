import { TodoDataAccess } from "./databaseAccess";
import { TodoItem } from "./todoItem";

export class Prefill {
    private static preFill: Prefill;
    private items: TodoItem[] = new Array<TodoItem>();
    private readonly dataAccess: TodoDataAccess = new TodoDataAccess();
    private constructor() {

    }

    public static get Instance(): Prefill {
        return this.preFill || (this.preFill = new this());
    }

    public async Populate(): Promise<void> {
        try {
            const schema = await this.dataAccess.GetAll();
            this.items = new Array<TodoItem>();
            schema.forEach(item => {
                const todoItem: TodoItem = new TodoItem();
                todoItem.Id = item.Id;
                todoItem.Completed = item.Completed;
                todoItem.CreationDate = item.CreationDate;
                todoItem.DueDate = item.DueDate;
                todoItem.Description = item.Description;
                todoItem.Title = item.Title;
                this.items.push(todoItem);
            });
        } catch (e) {
            console.log(`Couldn't retrieve all records ${e}`);
        }
    }

    get Items(): TodoItem[] {
        return this.items;
    }
}