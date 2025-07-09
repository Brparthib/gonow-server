/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("Connect to database!!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening on port ${envVars}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

// unhandled rejection error handler
process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection detected... Server shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// unhandled rejection error
// Promise.reject(new Error("Forgot to catch this promise"));

// uncaught exception error handler
process.on("uncaughtException", (err) => {
  console.log(
    "Uncaught exception error detected... Server shutting down...",
    err
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// uncaught exception error
// throw new Error("Forgot to handle the local error");

// signal termination handler
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received... Server shutting down...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
