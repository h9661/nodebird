const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
    static initiate(sequelize) {
        Comment.init(
            {
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
            foreignKey: "userId",   // 댓글 모델에서 사용자를 가리키는 외래 키
            as: "CommentingUser",   // 사용자 모델에서 사용할 이름
            onDelete: "SET NULL",
        });
        db.Comment.belongsTo(db.Post, {
            foreignKey: "postId",   // 댓글 모델에서 게시물을 가리키는 외래 키
            as: "CommentedPost",    // 게시물 모델에서 사용할 이름
            onDelete: "CASCADE",
        });
    }
}

module.exports = Comment;