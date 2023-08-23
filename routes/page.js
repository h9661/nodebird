const express = require("express");
const {
    renderProfile,
    renderJoin,
    renderMain,
    renderHashtag,
    renderChange,
} = require("../controllers/page");

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map((f) => f.id) || [];
    next();
});

router.get("/profile", renderProfile);
router.get("/join", renderJoin);
router.get("/", renderMain);
router.get("/hashtag", renderHashtag);
router.get("/change", renderChange);

module.exports = router;
