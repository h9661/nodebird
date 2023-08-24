const Sequelize = require("sequelize");
const User = require("./user");
const Post = require("./post");

class Comment extends Sequelize.Model {
    static initiate(sequelize) {
        Comment.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },

                userId: {
                    type: Sequelize.INTEGER,

                    references: {
                        model: User,
                        key: "id",
                    },
                },

                postId: {
                    type: Sequelize.INTEGER,

                    references: {
                        model: Post,
                        key: "id",
                    },
                },

                content: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Comment",
                tableName: "comments",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Comment.belongsTo(db.User, {
            foreignKey: "userId",
            as: "CommentingUser",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
        db.Comment.belongsTo(db.Post, {
            foreignKey: "postId",
            as: "CommentingPost",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    }
}

module.exports = Comment;
