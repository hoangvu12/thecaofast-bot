const express = require("express");
const router = express.Router();

const controllers = require("../controllers/orders");

router.post("/callback", controllers.callback);

module.exports = router;
