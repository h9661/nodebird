const express = require("express");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { join, login, logout } = require("../controllers/auth");

const router = express.Router();

// POST /auth/join
router.post("/join", isNotLoggedIn, join);

// POST /auth/login
router.post("/login", isNotLoggedIn, login);

// GET /auth/logout
router.get("/logout", isLoggedIn, logout);

// GET /auth/google
router.get("/google", passport.authenticate("google"));

// GET /auth/google/callback
router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/?error=구글로그인 실패",
    }),
    (req, res) => {
        res.redirect("/"); // 성공 시에는 /로 이동
    }
);

module.exports = router;
