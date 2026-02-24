const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();

const PORT = 3000;

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
  // TODO: Add user to the users array
  return res.json({ message: "Status pending" });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // TODO: Update user with the given id in the users array
    return res.json({ message: "Status pending" });
  })
  .delete((req, res) => {
    // TODO: Delete user with the given id from the users array
    return res.json({ message: "Status pending" });
  });

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
