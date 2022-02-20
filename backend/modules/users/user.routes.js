const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
} = require("./user.controllers");
const { protect } = require("../../middleware/authMiddleware");

userRouter.route(`/login`).post(loginUser);
userRouter.route(`/profile`).get(protect, getProfile);
userRouter.route(`/`).get(protect, getUsers).post(registerUser);
userRouter.route(`/:id`).put(protect, updateUser).delete(protect, deleteUser);

module.exports = userRouter;
