const express = require("express");
const router = express.Router();

const Client = require("../Client");

const controllers = require("../controllers/orders");

router.get("/", (req, res) => {
  console.log(Client.user.tag);

  res.json({ success: true });
});

router.post("/callback", controllers.callback);

module.exports = router;
