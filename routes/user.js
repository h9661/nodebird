const express = require("express");
const { isLoggedIn } = require("../middlewares");
const { follow, unfollow, change } = require("../controllers/user");

const router = express.Router();

router.post("/:userId/follow", isLoggedIn, follow);

router.post("/:userId/unfollow", isLoggedIn, unfollow);

router.post("/change", isLoggedIn, change);

module.exports = router;
