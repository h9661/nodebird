const Post = require("../models/post");
const Hashtag = require("../models/hashtag");
const path = require("path");

exports.afterUploadImage = (req, res) => {
    console.log(req.file);
    res.json({ url: `/images/${req.file.filename}` });
};

exports.uploadPost = async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map((tag) => {
                    return Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase() },
                    });
                })
            );
            await post.addHashtags(result.map((r) => r[0]));
        }
        res.redirect("/");
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId);

        await post.destroy();
        res.send("success");
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.likePost = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId);

        await post.addLikingUser(req.body.myId);
        res.send("success");
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.unlikePost = async (req, res, next) => {
    try {
        const post = await Post.findByPk(req.params.postId);

        await post.removeLikingUsers(req.body.myId);
        res.send("success");
    } catch (err) {
        console.error(err);
        next(err);
    }
};
