## 项目札记
1. TypeScript的数据类型不一定能对应到MongoDB中数据类型，因此在使用mongoose时需要通过`Schema`建立一个映射，参考`schema.ts`中的`model`方法。
2. `unknown`是TypeScript 3引入的一种新类型，可以添加额外一层类型安全。在很大程度上，可以认为`unknown`类型类似于`any`，因为我们也可以为其赋值任何类型。但不能在不使用类型断言的情况下，将它赋值给另外一个类型。
3. GraphQL的基础思想是**代码将与字段交互**，所以只要定义了如何获取这些字段，我们就可以编写任意复杂程度的查询，一次性地从多个位置检索数据，或者修改数据来进行更新。这解决了REST存在的一些问题，但GraphQL的目的并不是完全取代RESTful服务。在许多场合，我们可能想要同时使用REST和GraphQL。
4. 使用GraphQL时，**解析器**代表单个字段（参考`TodoItemResolver`类）。它获取我们需要的数据，实际上为GraphQL服务器提供了详细的指令，告诉它如何把查询转换为数据项（可以把这一点理解为我们为修改数据和查询数据创建单独架构的原因之一，即我们**不能使用查询字段的逻辑来修改字段**）。从这一点可以看到，**字段和解析器之间是一对一映射的关系**。
5. 更多关于Graphql的内容可以参考官方文档：https://typegraphql.com/docs/resolvers.html
6. 对于Angular Component，一般在`ngOnInit`方法中订阅Subject的数据，调用`subscribe`方法。
7. 对于server的代码，可以使用`tsc`命令直接编译，为了防止client端代码干扰，可以在`tsconfig.json`里面配置`exclude`选项，忽略一些folder。