const Sequelize = require('sequelize');
const { Model } = require('sequelize');

const { images_url } = require('../config/appConfig');

class Photo extends Model {
    static init(sequelize) {
        super.init({
            originalname: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    len: {
                        args: [1, 255],
                        msg: 'First Name field must be between 1 and 255 characters.'
                    },
                },
            },
            filename: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    len: {
                        args: [1, 255],
                        msg: 'Last Name field must be between 1 and 255 characters.'
                    },
                },
            },
            user_id: Sequelize.INTEGER,
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    return images_url + this.getDataValue('filename');
                }
            }
        }, {
            sequelize,
        });

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    }
}

module.exports = Photo;
