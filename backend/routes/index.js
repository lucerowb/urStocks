const express = require("express");
const router = express.Router();

router.use(`/stocks`, require("../modules/stocks/stock.routes"));
router.use(`/users`, require("../modules/users/user.routes"));

module.exports = router;
