"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "provider", {
            type: Sequelize.ENUM("local", "kakao", "google"),
            allowNull: false,
            defaultValue: "local",
        });
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn("users", "provider", {
            type: Sequelize.ENUM("local", "kakao"),
            allowNull: false,
            defaultValue: "local",
        });
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
