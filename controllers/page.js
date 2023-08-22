function renderProfile(req, res) {
    res.render("profile", { title: "내 정보 - NodeBird", user: req.user });
}

function renderJoin(req, res) {
    res.render("join", { title: "회원가입 - NodeBird", user: req.user });
}

function renderMain(req, res, next) {
    const twits = [];
    res.render("main", {
        title: "NodeBird",
        twits,
        user: req.user,
    });
}

module.exports = {
    renderProfile,
    renderJoin,
    renderMain,
};
