exports.follow = async (req, res, next) => {
    try {
        const user = req.user;
        console.log(user);
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
