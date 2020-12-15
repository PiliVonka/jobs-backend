// External
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";

// Local
import jobSchema from "./graphql/schemas/job.mjs";
import jobResolver from "./graphql/resolvers/job.mjs";
import cors from "cors";

// Environment variables
dotenv.config();
const {
  NODE_ENV,
  MONGO_DB_URI,
  PORT,
  HOST
} = process.env;

console.log({ NODE_ENV, MONGO_DB_URI, PORT, HOST });

// Express
const app = express();
mongoose.set("useCreateIndex", true);

// Set Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(cors());

// Serve React Application
if (NODE_ENV !== "development") {
  app.use(express.static("dist"));
}

// Init ApolloServer
const server = new ApolloServer({
  typeDefs: [jobSchema],
  resolvers: [jobResolver],
  playground: {
    settings: {
      "request.credentials": "include",
      "schema.polling.enable": false,
    },
  },
  context: ({ req, res }) => ({ req, res }),
});

// Init cors
server.applyMiddleware({
  app
});

// Connect to MongoDB and start the server
mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  const port = PORT || 8080;
  const host = HOST || "http://0.0.0.0";
  app.listen({ port, host }, () => {
    console.log(`Server running on port ${port}`);
  });
});
mongoose.connection.on("error", (error) => console.error(error));
