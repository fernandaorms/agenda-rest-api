'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'profile_picture_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'photos',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });

        await queryInterface.addColumn('contacts', 'profile_picture_id', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'photos',
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('contacts', 'profile_picture_id');

        await queryInterface.removeColumn('users', 'profile_picture_id');
    }
};
