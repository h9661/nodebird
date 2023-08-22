const express = require("express");
const { isLoggedIn } = require("../middlewares");
const { follow } = require("../controllers/user");

const router = express.Router();

router.post("/:userId/follow", isLoggedIn, follow);

module.exports = router;
