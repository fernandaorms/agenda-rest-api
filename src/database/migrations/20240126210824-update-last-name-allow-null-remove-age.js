'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('contacts', 'last_name', {
            type: Sequelize.STRING,
            allowNull: true,
        });

        await queryInterface.removeColumn('contacts', 'age');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('contacts', 'age', {
            type: Sequelize.INTEGER,
            allowNull: false,
        });

        await queryInterface.changeColumn('contacts', 'last_name', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    }
};
