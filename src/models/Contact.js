const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Contact extends Model {
    static init(sequelize) {
        super.init({
            first_name: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'First Name field must be between 3 and 255 characters.'
                    },
                },
            },
            last_name: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    len: {
                        args: [3, 255],
                        msg: 'Last Name field must be between 3 and 255 characters.'
                    },
                },
            },
            email: {
                type: Sequelize.STRING,
                defaultValue: '',
                unique: {
                    msg: 'Email must be unique.'
                },
                validate: {
                    isEmail: {
                        msg: 'Plase enter a valide email address.'
                    },
                },
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            phone_region: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
            },
            phone_number: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
            },
            user_id: Sequelize.INTEGER,
            profile_picture_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Photo, { foreignKey: 'profile_picture_id', as: 'profile_picture'});
    }
}

module.exports = Contact;
