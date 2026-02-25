const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("stream/consumers");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));

// This Middleware function has the access the access to the request and response objects and the next Middleware function in the application’s request-response cycle. The next Middleware function is commonly denoted by a variable named next. If the current Middleware function does not end the request-response cycle, it must call next() to pass control to the next Middleware function. Otherwise, the request will be left hanging.
app.use((req, res, next) => {
  console.log("hello from Middleware 1");
  next();
});

app.use((req, res, next) => {
  console.log("hello from Middleware 2");
  next();
});

app.use((req, res, next) => {
  fs.appendFile(
    "log.text",
    `Request made at ${new Date().toISOString()} with method ${req.method} and url ${req.url}\n`,
    (err, data) => {
      if (err) {
        console.error("Failed to write to log file", err);
      }
      console.log("hello from Middleware 3");
      next();
    },
  );
});

//ROUTES

app.get("/users", (req, res) => {
  const html = `
  <ul>
    ${users.map((user) => `<li>${user.first_name} ${user.last_name}</li>`).join("")}
  </ul>`;
  return res.send(html);
});

// REST API

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  //   users.push({
  //     id: users.length + 1,
  //     first_name: body.first_name,
  //     last_name: body.last_name,
  //     email: body.email,
  //     gender: body.gender,
  //     job_title: body.job_title,
  //   });

  users.push({ id: users.length + 1, ...body });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }
    users[index] = { ...users[index], ...body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update file" });
      }
      return res.json({ status: "success", id: id });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update file" });
      }
      return res.json({
        status: "success",
        id: id,
        message: "User deleted successfully",
      });
    });
  });

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
