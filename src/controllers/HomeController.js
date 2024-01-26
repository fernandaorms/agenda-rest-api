const Student = require('../models/Student');

class HomeController {
    async index(req, res) {
        const newStudent = await Student.create({
            first_name: 'Fernanda',
            last_name: 'Ramos',
            email: 'fernandaoliveira.rms@gmail.com',
            age: 23,
            phone: '123456789',
        });

        res.json(newStudent);
    }
}

module.exports = new HomeController();
