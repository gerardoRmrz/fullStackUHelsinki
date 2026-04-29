import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { SetContextLink } from "@apollo/client/link/context";

const authLink = new SetContextLink((prevContext, operation) => {
  const token = localStorage.getItem("books-user-token");
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});
// setting configuration for http connect for Query and Mutation
const httpLink = new HttpLink({
  uri: "http://localhost:3001/graphql",
});

// setting configuration for websocket connect for subscription
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3001/graphql",
  }),
);

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink),
);
// setting up apollo client with the server http and websocket links
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
