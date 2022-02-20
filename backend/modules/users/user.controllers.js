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
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      code: 0,
      message: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
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
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    code: 0,
    message: "success",
    data: { id: _id, name: name, email: email },
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
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });
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

  const { name, email, password } = req.body;

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
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
