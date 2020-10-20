import mongoose from 'mongoose';

export class Mongo {
    constructor(private url: string = "mongodb://localhost:27017/ng-todo-graphq") {}

    public Connect(): void {
        mongoose.connect(this.url, {useNewUrlParser: true}, (e: unknown) => {
            if (e) {
                console.log('Unable to connect to DB: ' + e);
            } else {
                console.log('Connected to DB successfully');
            }
        })
    }
}

export type TodoModelType = mongoose.Model<mongoose.Document>;