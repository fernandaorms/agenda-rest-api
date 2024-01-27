const Sequelize = require('sequelize');
const { Model } = require('sequelize');

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
