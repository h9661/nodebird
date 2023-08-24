const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init(
            {
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                    unique: true,
                },
                nick: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                provider: {
                    type: Sequelize.ENUM("local", "kakao", "google"),
                    allowNull: false,
                    defaultValue: "local",
                },
                snsId: {
                    type: Sequelize.STRING(30),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.User.hasMany(db.Post);
        db.User.belongsToMany(db.User, {
            foreignKey: "followingId",
            as: "Followers",
            through: "Follow",
        });
        db.User.belongsToMany(db.User, {
            foreignKey: "followerId",
            as: "Followings",
            through: "Follow",
        });
        db.User.belongsToMany(db.Post, {
            through: 'Likes',      // 연결 테이블 이름
            foreignKey: 'userId',  // 연결 테이블에서 사용자를 가리키는 외래 키
            otherKey: 'postId',    // 연결 테이블에서 게시물을 가리키는 외래 키
            as: 'LikedPosts'       // 사용자 모델에서 사용할 이름
        });
        db.User.belongsToMany(db.Post, {
            through: 'Comments',
            foreignKey: "CommentingUserId",
            otherKey: "CommentedPostId",
            as: "CommentedPosts",
        });
    }
}

module.exports = User;
