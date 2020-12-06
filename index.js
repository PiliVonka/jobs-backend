// External
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";

// Local
import typeDefs from "./graphql/schemas";
import resolvers from "./graphql/resolvers";

// Constants
const {
  NODE_ENV,
  MONGO_DB_URI,
  PORT,
} = process.env;

const app = express();
mongoose.set("useCreateIndex", true);

// Set Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

// Serve React Application
if (NODE_ENV !== "development") {
  app.use(express.static("dist"));
}

// Init ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground:
    NODE_ENV.trim() !== "development"
      ? false
      : {
          settings: {
            "request.credentials": "include",
            "schema.polling.enable": false,
          },
        },
  context: ({ req, res }) => ({ req, res }),
});

// Init cors
server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: "http://localhost:3000",
  },
});

// Connect to MongoDB and start the server
mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  const port = PORT || 8080;
  app.listen({ port }, () => {
    console.log(`Server running on port ${port}`);
  });
});
mongoose.connection.on("error", (error) => console.error(error));
