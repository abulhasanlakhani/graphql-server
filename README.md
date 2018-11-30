# graphql-server

## GraphQL Experiment

This project was built as part of the Innovation Week at my workplace XE.com

I did the server-end built on GraphQL where as my colleague integrated with this API using Apollo Client and React

The server exposes one endpoint that supports multiple queries and a mutation

Check out the code to explore.

## Testing the GraphQL Server

### Starting up the JSON REST Server:

This GraphQL server is using a free package called My JSON Server (https://my-json-server.typicode.com/) which creates a fake online REST server.

* After downloading the repo just run **npm install** to get all the packages used by this GraphQL server
* Then, open a new terminal in the same folder and run **npm json:server** to start the fake Rest Server.
* This will start the RESt server and you can try the endpoints exposed through your db.json file
* Try http://localhost:3000/orders for example and you should be able to see the list of orders coming through as JSON

### Starting up your GraphQL server:
* In your original console, run **npm start**
* Fire up your favorite browser and visit http://localhost:4000/graphql
* Try out the below query in your graphiQL UI:
```graphql
{
  orders {
    referenceId
    orderReference
  }
}
```

Good thing about GraphiQL interface is that it supports full intellisence so you can just start typing the query and you will get all the help

To learn more about GraphQL, visit https://graphql.org/learn/

**P.S. It was my first ever experience working with GraphQL and I am sure I have just scratched the surface and there is lot more to learn in future.**
