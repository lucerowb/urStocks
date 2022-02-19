const asyncHandler = require("express-async-handler");

/**
 * @desc Get all stocks
 * @route GET /api/stocks
 * @access Private
 */
const getStocks = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get stocks` });
});

/**
 * @desc Set stock
 * @route POST /api/stocks
 * @access Private
 */
const setStock = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("text is required");
    // res.json({ message: "text is required" });
  }
  res.status(200).json({ message: `Set stock` });
});

/**
 * @desc Update stock
 * @route PUT /api/stocks/:id
 * @access Private
 */
const updateStock = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update stock ${req.params.id}` });
});

/**
 * @desc Delete stock
 * @route DELETE /api/stocks/:id
 * @access Private
 */
const deleteStock = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete stock ${req.params.id}` });
});

module.exports = { getStocks, setStock, updateStock, deleteStock };
