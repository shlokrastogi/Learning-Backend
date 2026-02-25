const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { json } = require("stream/consumers");
const { error } = require("console");
const { Mongoose, default: mongoose } = require("mongoose");
const { type } = require("os");

const app = express();

const PORT = 3000;

// Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/user-data")
  //   .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log("Mongo Error: ", err));

// Schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

// Middleware
app.use(express.urlencoded({ extended: false }));

// This Middleware function has the access the access to the request and response objects and the next Middleware function in the application’s request-response cycle. The next Middleware function is commonly denoted by a variable named next. If the current Middleware function does not end the request-response cycle, it must call next() to pass control to the next Middleware function. Otherwise, the request will be left hanging.
app.use((req, res, next) => {
  //   console.log("hello from Middleware 1");
  next();
});

app.use((req, res, next) => {
  //   console.log("hello from Middleware 2");
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

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
  </ul>`;
  return res.send(html);
});

// REST API

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});

  //   res.setHeader("X-MyName", "Shlok"); // Custom header
  //   //Always use X prefix for custom headers to avoid conflicts with standard headers
  return res.status(200).json(allDbUsers);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  //   users.push({
  //     id: users.length + 1,
  //     first_name: body.first_name,
  //     last_name: body.last_name,
  //     email: body.email,
  //     gender: body.gender,
  //     job_title: body.job_title,
  //   });

  //   users.push({ id: users.length + 1, ...body });
  //   fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //     return res.status(201).json({ status: "success", id: users.length });
  //   });

  const result = await User.create({
    firstName: body.first_name,
    lastname: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  //   console.log(result);

  return res.status(201).json({ message: "success" });
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);

    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "No user found" });
    return res.status(200).json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
      lastName: "changed",
    });
    return res.status(201).json({ message: "User Upadated" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "User deleted successfully" });
  });

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
