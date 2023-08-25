const Sequelize = require("sequelize");
const User = require("./user");
const Hashtag = require("./hashtag");
const Post = require("./post");
const Comment = require("./comment");
const Recomment = require("./recomment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;

db.User = User;
db.Hashtag = Hashtag;
db.Post = Post;
db.Comment = Comment;
db.Recomment = Recomment;


User.initiate(sequelize);
Hashtag.initiate(sequelize);
Post.initiate(sequelize);
Comment.initiate(sequelize);
Recomment.initiate(sequelize);

User.associate(db);
Hashtag.associate(db);
Post.associate(db);
Comment.associate(db);
Recomment.associate(db);

module.exports = db;
