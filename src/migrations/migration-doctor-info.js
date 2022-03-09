'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Doctor_infos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            priceId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            provinceId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            paymentId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            addressClinic: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nameClinic: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER,
                defaultValue: 0
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
        await queryInterface.dropTable('Doctor_infos');
    }
};