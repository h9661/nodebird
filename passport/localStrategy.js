const passport = require("passport");
const bcrypt = require("bcryptjs");
const { Strategy } = require("passport-local");
const User = require("../models/user");

module.exports = () => {
    passport.use(
        new Strategy(
            {
                usernameField: "email",
                passwordField: "password",
                passReqToCallback: false,
            },
            async (email, password, done) => {
                try {
                    const exUser = await User.findOne({ where: { email } });

                    if (exUser) {
                        const result = bcrypt.compare(
                            password,
                            exUser.password
                        );

                        if (result) {
                            done(null, exUser);
                        } else {
                            done(null, false, {
                                message: "비밀번호가 일치하지 않습니다.",
                            });
                        }
                    }
                } catch (err) {
                    console.log(err);
                    done(err);
                }
            }
        )
    );
};
