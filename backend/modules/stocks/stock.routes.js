const express = require("express");
const {
  getStocks,
  setStock,
  updateStock,
  deleteStock,
} = require("./stock.controllers");
const stockRouter = express.Router();

stockRouter.route(`/`).get(getStocks).post(setStock);
stockRouter.route(`/:id`).put(updateStock).delete(deleteStock);

module.exports = stockRouter;
