const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const bcryptjs = require('bcryptjs');

class User extends Model {
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
            password_hash: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            password: {
                type: Sequelize.VIRTUAL,
                defaultValue: '',
                validate: {
                    len: {
                        args: [6, 50],
                        msg: 'Password must be between 6 and 50 characters.'
                    },
                    is: {
                        args: /^(?=.*\d)(?=.*[A-Z])/, // Contain Number and Upper
                        msg: 'Password must contain at least one number and one uppercase letter'
                    }
                },
            },
            profile_picture_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
        }, {
            sequelize,
        });

        this.addHook('beforeSave', async user => {
            if(user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        });

        return this;
    }

    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash);
    }

    static associate(models) {
        this.belongsTo(models.Photo, { foreignKey: 'profile_picture_id', as: 'profile_picture' });
        this.hasMany(models.Photo, { foreignKey: 'user_id', as: 'photos'});
    }
}

module.exports = User;
