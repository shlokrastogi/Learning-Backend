const express = require("express");
const router = express.Router();
const {
  handleCreateNewUser,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
} = require("../controller/");

// router.get("/", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//   <ul>
//     ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
//   </ul>`;
//   return res.send(html);
// });

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
