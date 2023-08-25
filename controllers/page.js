const Post = require("../models/post");
const User = require("../models/user");
const Hashtag = require("../models/hashtag");
const Comment = require("../models/comment");
const Recomment = require("../models/recomment");

async function renderProfile(req, res) {
    let twits = await Post.findAll({
        where: { id: req.user?.LikedPosts.map((p) => p.id) || [] },
        include: {
            model: User,
            attributes: ["id", "nick"],
        },
    });

    res.render("profile", { title: "내 정보 - NodeBird", twits: twits || [] });
}

function renderJoin(req, res) {
    res.render("join", { title: "회원가입 - NodeBird" });
}

function renderChange(req, res) {
    res.render("change", { title: "정보 변경 - NodeBird" });
}

async function renderMain(req, res, next) {
    const posts = await Post.findAll({
        include: [
            {
                model: User,
                attributes: ["id", "nick"],
            },
            {
                model: User,
                attributes: ["id", "nick"],
                as: "LikingUsers",
            },
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: ["id", "nick"],
                    },
                    {
                        model: Recomment,
                        include: [
                            {
                                model: User,
                                attributes: ["id", "nick"],
                            },
                        ],
                    }
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    });

    for (let post of posts) {
        post.LikingUsersId = post.LikingUsers?.map((u) => u.id) || [];
    }

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
                    {
                        model: User,
                        as: "LikingUsers",
                    },
                ],
                order: [["createdAt", "DESC"]],
            });
        }

        for (let post of posts) {
            post.LikingUsersId = post.LikingUsers?.map((u) => u.id) || [];
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
    renderChange,
};
