const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Student extends Model {
    static init(sequelize) {
        super.init({
            first_name: Sequelize.STRING,
            last_name: Sequelize.STRING,
            email: Sequelize.STRING,
            age: Sequelize.INTEGER,
            phone: Sequelize.STRING,
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

module.exports = Student;
