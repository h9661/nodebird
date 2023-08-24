const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
    static initiate(sequelize) {
        Comment.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },

                userId:{
                    type: Sequelize.INTEGER,
                    allowNull: false,

                    references: {
                        model: "users",
                        key: "id",
                    },

                    onDelete: "cascade",
                    onUpdate: "cascade",
                },

                postId:{
                    type: Sequelize.INTEGER,
                    allowNull: false,

                    references: {
                        model: "posts",
                        key: "id",
                    },

                    onDelete: "cascade",
                    onUpdate: "cascade",
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
}

module.exports = Comment;
