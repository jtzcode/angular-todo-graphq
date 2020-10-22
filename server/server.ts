import { GraphQLSchema } from "graphql";
import { buildSchema } from 'type-graphql';
import path from 'path';
import { Mongo } from "./database";
import { Prefill } from "./prefill";
import { TodoItemResolver } from "./todoItem";
import { ApolloServer } from "apollo-server";

export class Server {
    constructor(private mongo: Mongo = new Mongo()) {}

    public async Start(): Promise<void> {
        this.mongo.Connect();
        await Prefill.Instance.Populate();

        const schema: GraphQLSchema = await buildSchema({
            resolvers: [TodoItemResolver],
            validate: false,
            emitSchemaFile: path.resolve(__dirname, 'apolloschema.gql')
        });

        const server = new ApolloServer({schema, playground: true});
        await server.listen(3000);
    }
}

new Server().Start();