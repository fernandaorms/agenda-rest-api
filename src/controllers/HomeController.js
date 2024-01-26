const Contact = require('../models/Contact');

class HomeController {
    async index(req, res) {
        return res.json('Welcome');
    }
}

module.exports = new HomeController();
