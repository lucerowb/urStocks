const express = require("express");
const router = express.Router();

router.use(`/stocks`, require("../modules/stocks/stock.routes"));

module.exports = router;
