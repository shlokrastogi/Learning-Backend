const User = require("../models/user");

async function handleCreateNewUser(req, res) {
  const body = req.body;

  if (
    !body ||
    !body.firstName ||
    !body.lastName ||
    !body.email ||
    !body.gender ||
    !body.jobTitle
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
}

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.status(200).json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "No user found" });
  return res.status(200).json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    lastName: "changed",
  });
  return res.status(201).json({ message: "User Upadated" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.status(201).json({ message: "User deleted successfully" });
}

module.exports = {
  handleCreateNewUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
