/* 

https://studio.apollographql.com/sandbox/explorer 

*/
const { createServer } = require("http");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/use/ws");
const express = require("express");
const { ApolloServer } = require("@apollo/server");
const cors = require("cors");
const { expressMiddleware } = require("@as-integrations/express5");

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
  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    plugins: [
      // Properly drain the HTTP server when Apollo Server stops
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
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

  // Save the returned server's info so we can shutdown this server later
  const serverCleanup = useServer(
    {
      schema,
      /*   onConnect: (ctx) => {
        console.log("Connect", ctx);
      },
      onSubscribe: (ctx, id, payload) => {
        console.log("Subscribe", { ctx, id, payload });
      },
      onNext: (ctx, id, subscribePayload, args, result) => {
        console.debug("Next", { ctx, id, args, subscribePayload, result });
      },
      onError: (ctx, id, subscribePayload, errors) => {
        console.error("Error", { ctx, id, subscribePayload, errors });
      },
      onComplete: (ctx, id, subscribePayload) => {
        console.log("Complete", { ctx, id, subscribePayload });
      }, */
    },
    wsServer,
  );

  await server.start();
  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req.headers.authorization;
        const currentUser = await getUserFromAuthHeader(auth);
        return { currentUser };
      },
    }),
  );

  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(port, () => {
    console.log(`Server is now running on http://localhost:${port}/graphql`);
  });
};

module.exports = startServer;
