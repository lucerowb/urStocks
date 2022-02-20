const express = require("express");
const stockRouter = express.Router();
const {
  getStocks,
  setStock,
  getStockById,
  updateStock,
  deleteStock,
} = require("./stock.controllers");
const { protect } = require("../../middleware/authMiddleware");

stockRouter.route(`/`).get(protect, getStocks).post(protect, setStock);
stockRouter
  .route(`/:id`)
  .get(protect, getStockById)
  .put(protect, updateStock)
  .delete(protect, deleteStock);

module.exports = stockRouter;
