const passport = require("passport");
const local = require("./localStrategy.js");
const google = require("./googleStrategy.js");
const User = require("../models/user");

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log("deserialize");
        User.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: ["id", "nick"],
                    as: "Followers",
                },
                {
                    model: User,
                    attributes: ["id", "nick"],
                    as: "Followings",
                },
            ],
        })
            .then((user) => {
                console.log("user", user);
                done(null, user);
            })
            .catch((err) => done(err));
    });
    local();
    google();
};
