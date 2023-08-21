function renderProfile(req, res) {
    res.render("profile", { title: "내 정보 - NodeBird" });
}

function renderJoin(req, res) {
    res.render("join", { title: "회원가입 - NodeBird" });
}

function renderMain(req, res, next) {
    const twits = [];
    res.render("main", {
        title: "NodeBird",
        twits,
    });
}

module.exports = {
    renderProfile,
    renderJoin,
    renderMain,
};
