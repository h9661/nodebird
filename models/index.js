const Sequelize = require("sequelize");
const User = require("./user");
const Hashtag = require("./hashtag");
const Post = require("./post");

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

User.initiate(sequelize);
Hashtag.initiate(sequelize);
Post.initiate(sequelize);

User.associate(db);
Hashtag.associate(db);
Post.associate(db);

module.exports = db;
