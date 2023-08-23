const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { isLoggedIn } = require("../middlewares");
const {
    afterUploadImage,
    uploadPost,
    deletePost,
} = require("../controllers/post");
const router = express.Router();

const upload = multer({
    dest: "uploads/images/",
    limits: {
        fieldSize: 10 * 1024 * 1024,
    },
});

router.post("/img", isLoggedIn, upload.single("img"), afterUploadImage);

router.post("/", isLoggedIn, multer().none(), uploadPost);

router.post("/:postId/delete", isLoggedIn, deletePost);

module.exports = router;
