const User = require("../models/user");
const bcryptjs = require("bcryptjs");

exports.follow = async (req, res, next) => {
    try {
        const user = req.user;
        if (user) {
            await user.addFollowing(req.params.userId);
            return res.send("success");
        } else {
            res.status(404).send("no user");
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.unfollow = async (req, res, next) => {
    try {
        const user = req.user;
        if (user) {
            await user.removeFollowing(req.params.userId);
            return res.send("success");
        } else {
            res.status(404).send("no user");
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.change = async (req, res, next) => {
    try {
        const { id, nick, password } = req.body;
        const user = await User.findByPk(id);
        user.nick = nick;
        user.password = await bcryptjs.hash(password, 12);
        await user.save();

        return res.redirect("/");
    } catch (err) {
        console.error(err);
        next(err);
    }
};
