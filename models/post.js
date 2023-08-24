const Sequelize = require("sequelize");

class Post extends Sequelize.Model {
    static initiate(sequelize) {
        Post.init(
            {
                content: {
                    type: Sequelize.STRING(140),
                    allowNull: false,
                },
                img: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                video: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Post",
                tableName: "posts",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
        db.Post.belongsToMany(db.User, {
            through: 'Likes',      // 연결 테이블 이름
            foreignKey: 'postId',  // 연결 테이블에서 게시물을 가리키는 외래 키
            otherKey: 'userId',    // 연결 테이블에서 사용자를 가리키는 외래 키
            as: 'LikingUsers'      // 게시물 모델에서 사용할 이름
        });
    }
}

module.exports = Post;
