const express = require("express");
const {
  getStocks,
  setStock,
  updateStock,
  deleteStock,
} = require("./controllers/stockControllers");
const router = express.Router();

router.route(`/`).get(getStocks).post(setStock);
router.route(`/:id`).put(updateStock).delete(deleteStock);

module.exports = router;
