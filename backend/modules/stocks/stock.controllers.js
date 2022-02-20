const asyncHandler = require("express-async-handler");
const Stock = require(`./stock.model`);
const User = require(`../users/user.model`);

/**
 * @desc Get all stocks
 * @route GET /api/stocks
 * @access Private
 */
const getStocks = asyncHandler(async (req, res) => {
  const stocks = await Stock.find({ user: req.user.id });
  res.status(200).json({ code: 0, message: "success", data: stocks });
});

/**
 * @desc Set stock
 * @route POST /api/stocks
 * @access Private
 */
const setStock = asyncHandler(async (req, res) => {
  const stock = await Stock.create({
    user: req.user.id,
    stock_name: req.body.stock_name,
    txn_type: req.body.txn_type,
    quantity: req.body.quantity,
    amount: req.body.amount,
    txn_date: req.body.txn_date,
  });
  res.status(200).json({ code: 0, message: "success", data: stock });
});

/**
 * @desc Get stock
 * @route GET /api/stocks/:id
 * @access Private
 */
const getStockById = asyncHandler(async (req, res) => {
  const stock = await Stock.findById(req.params.id);
  if (!stock) {
    res.status(400);
    throw new Error("Stock not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check for logged in user matches the stock user
  if (stock.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({ code: 0, message: "success", data: stock });
});

/**
 * @desc Update stock
 * @route PUT /api/stocks/:id
 * @access Private
 */
const updateStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findById(req.params.id);
  if (!stock) {
    res.status(400);
    throw new Error("Stock not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check for logged in user matches the stock user
  if (stock.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedStock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ code: 0, message: "success", data: updatedStock });
});

/**
 * @desc Delete stock
 * @route DELETE /api/stocks/:id
 * @access Private
 */
const deleteStock = asyncHandler(async (req, res) => {
  const stock = await Stock.findById(req.params.id);
  if (!stock) {
    res.status(400);
    throw new Error("Stock not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // check for logged in user matches the stock user
  if (stock.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await stock.remove();
  res
    .status(200)
    .json({ code: 0, message: "success", data: { _id: req.params.id } });
});

module.exports = {
  getStocks,
  setStock,
  getStockById,
  updateStock,
  deleteStock,
};
