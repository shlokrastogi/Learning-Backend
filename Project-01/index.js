const express = require("express");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares/index");
const userRouter = require("./routes/user");

// const users = require("./MOCK_DATA.json");
// const { json } = require("stream/consumers");
// const { error } = require("console");
// const { type } = require("os");

const app = express();
const PORT = 3000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/user-data").then(() =>
  console.log("Mongoose connected succesfully"),
);

// Middleware
app.use(express.urlencoded({ extended: false }));

// This Middleware function has the access the access to the request and response objects and the next Middleware function in the application’s request-response cycle. The next Middleware function is commonly denoted by a variable named next. If the current Middleware function does not end the request-response cycle, it must call next() to pass control to the next Middleware function. Otherwise, the request will be left hanging.

app.use(logReqRes("log.text"));

// Router
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
