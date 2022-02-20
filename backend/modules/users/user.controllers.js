const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require(`./user.model`);
const { generateToken } = require("../../utility/jwt-utils");

/**
 * @desc Authenticate a user
 * @route POST /api/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      code: 0,
      message: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
/**
 * @desc Get user data
 * @route POST /api/user/profile
 * @access Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const { _id, name, email, username } = await User.findById(req.user.id);
  res
    .status(200)
    .json({
      code: 0,
      message: "success",
      data: { id: _id, name: name, email: email, username: username },
    });
});

// /**
//  * @desc Get all users
//  * @route GET /api/users
//  * @access Private
//  */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ code: 0, message: "success", data: users });
});

/**
 * @desc Register user
 * @route POST /api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email, username });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create users
  const user = await User.create({
    name,
    email,
    username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      code: 0,
      message: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        token: generateToken(user._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc Update user
 * @route PUT /api/users/:id
 * @access Private
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const { name, email, username, password } = req.body;

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      username,
      password: hashedPassword,
    },
    {
      new: true,
    }
  );

  if (updatedUser) {
    res.status(201).json({
      code: 0,
      message: "success",
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        username: updatedUser.username,
        token: generateToken(updatedUser._id),
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc Delete user
 * @route DELETE /api/users/:id
 * @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  await user.remove();
  res
    .status(200)
    .json({ code: 0, message: "success", data: { _id: req.params.id } });
});

module.exports = {
  loginUser,
  getProfile,
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
};
