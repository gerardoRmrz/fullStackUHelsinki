/* const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { expressMiddleware } = require("@as-integrations/express5");
const cors = require("cors");
const express = require("express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const http = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws"); */

/* LIBRERÍAS PARA LAS SUBCRIPCIONES DE GRAPHQL */
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { execute, subscribe } = require("graphql");
const { ApolloServer } = require("apollo-server-express");
/** ============================================= **/

const jwt = require("jsonwebtoken");
const resolvers = require("../graphQL/resolvers");
const typeDefs = require("../graphQL/typeDefs");
const User = require("../models/user");

const getUserFromAuthHeader = async (auth) => {
  if (!auth || !auth.startsWith("Bearer ")) {
    return null;
  }

  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
  return User.findById(decodedToken.id);
};

const startServer = async (port) => {
  const app = express();

  const httpServer = createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" },
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization;
        const currentUser = await getUserFromAuthHeader(auth);
        return { currentUser };
      },
    }),
  );

  server.applyMiddleware({ app });
  httpServer.listen(port, () =>
    console.log(`Http Server is now running on ${port}`),
  );
};

module.exports = startServer;

/* const startServer = async (port) => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization;
        const currentUser = await getUserFromAuthHeader(auth);
        return { currentUser };
      },
    }),
  );

  httpServer.listen(port, () =>
    console.log(`Server is now running on http://localhost:${port}`),
  );
}; */
