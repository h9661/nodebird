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
            targetKey: "id",
        });
        db.Comment.belongsTo(db.Post, {
            foreignKey: "postId",
            targetKey: "id",
        });
        db.Comment.hasMany(db.Recomment, {
            foreignKey: "commentId",
            sourceKey: "id",
        });
    }
}

module.exports = Comment;
