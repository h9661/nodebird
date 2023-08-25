const Sequelize = require("sequelize");

class Recomment extends Sequelize.Model {
    static initiate(sequelize) {
        Recomment.init(
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
                modelName: "Recomment",
                tableName: "recomments",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.Recomment.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "id",
        });
        db.Recomment.belongsTo(db.Comment, {
            foreignKey: "commentId",
            targetKey: "id",
        });
        db.Recomment.belongsTo(db.Post, {
            foreignKey: "postId",
            targetKey: "id",
        });
    }
}

module.exports = Recomment;
