const Post = require("../models/post");
const User = require("../models/user");
const Hashtag = require("../models/hashtag");

function renderProfile(req, res) {
    res.render("profile", { title: "내 정보 - NodeBird" });
}

function renderJoin(req, res) {
    res.render("join", { title: "회원가입 - NodeBird" });
}

async function renderMain(req, res, next) {
    const posts = await Post.findAll({
        include: {
            model: User,
            attributes: ["id", "nick"],
        },
        order: [["createdAt", "DESC"]],
    });

    res.render("main", {
        title: "NodeBird",
        twits: posts,
    });
}

async function renderHashtag(req, res, next) {
    const query = req.query.hashtag;

    if (!query) {
        return res.redirect("/");
    }

    try {
        const hashtag = await Hashtag.findOne({
            where: { title: query },
        });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({
                include: [
                    {
                        model: User,
                    },
                ],
                order: [["createdAt", "DESC"]],
            });
        }

        return res.render("main", {
            title: `${query} | NodeBird`,
            twits: posts,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
}

module.exports = {
    renderProfile,
    renderJoin,
    renderMain,
    renderHashtag,
};
