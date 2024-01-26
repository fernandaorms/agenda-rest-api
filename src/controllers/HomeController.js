const Contact = require('../models/Contact');

class HomeController {
    async index(req, res) {
        const newContact = await Contact.create({
            first_name: 'Fernanda',
            last_name: 'Ramos',
            email: 'framos@gmail.com',
            age: 23,
            phone: '123456789',
            user_id: 1,
        });

        res.json(newContact);
    }
}

module.exports = new HomeController();
