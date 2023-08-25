const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { isLoggedIn } = require("../middlewares");
const {
    afterUploadImage,
    uploadPost,
    deletePost,
    likePost,
    unlikePost,
    addComment,
    afterUploadVideo,
    addRecomment,
} = require("../controllers/post");
const router = express.Router();

const uploadImage = multer({
    dest: "uploads/images/",
    limits: {
        fieldSize: 10 * 1024 * 1024,
    },
});

const uploadVideo = multer({
    dest: "uploads/videos/",
    limits: {
        fieldSize: 100 * 1024 * 1024,
    },
});

router.post("/img", isLoggedIn, uploadImage.single("img"), afterUploadImage);

router.post("/video", isLoggedIn, uploadVideo.single("video"), afterUploadVideo);

router.post("/", isLoggedIn, multer().none(), uploadPost);

router.post("/", isLoggedIn, multer().none(), uploadPost);

router.post("/:postId/delete", isLoggedIn, deletePost);

router.post("/:postId/like", isLoggedIn, likePost);

router.post("/:postId/unlike", isLoggedIn, unlikePost);

router.post("/:postId/comment", isLoggedIn, addComment);

router.post("/:postId/comment/:commentId/recomment", isLoggedIn, addRecomment);

module.exports = router;
