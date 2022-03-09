'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Specialties', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            specialtyName: {
                type: Sequelize.STRING
            },
            descriptionHtml: {
                type: Sequelize.TEXT
            },
            descriptionMarkdown: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.BLOB('long'),
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Specialties');
    }
};