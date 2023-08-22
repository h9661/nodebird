const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const User = require("../models/user");

module.exports = () => {
    passport.use(
        new Strategy(
            {
                clientID: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: "/auth/google/callback",
                scope: ["profile"],
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log("google profile", profile);

                try {
                    const exUser = await User.findOne({
                        where: { snsId: profile.id, provider: "google" },
                    });

                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile.emails,
                            nick: profile.displayName,
                            snsId: profile.id,
                            provider: "google",
                        });
                        done(null, newUser);
                    }
                } catch (err) {
                    console.log(err);
                    done(err);
                }
            }
        )
    );
};
