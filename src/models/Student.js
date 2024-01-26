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
        }, {
            sequelize,
        });
        
        return this;
    }
}

module.exports = Student;
