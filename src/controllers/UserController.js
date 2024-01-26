const User = require('../models/User');

class UserController {
    async create(req, res) {
        try {
            const newUser = await User.create(req.body);
    
            return res.json(newUser);
        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }

    async index(req, res) {
        try {
            const users = await User.findAll();
            
            return res.json(users);
        } catch(e) {
            return res.json(null);
        }
    }

    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.id);

            if(!user) {
                return res.status(400).json({ 
                    errors: ['User doesn\'t exist.'] 
                });
            }

            return res.json(user);
        } catch(e) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {
            if(!req.params.id) {
                return res.status(400).json({ 
                    errors: ['ID not sent.'] 
                });
            }

            const user = await User.findByPk(req.params.id);

            if(!user) {
                return res.status(400).json({ 
                    errors: ['User doesn\'t exist.'] 
                });
            }

            const updatedUser = await user.update(req.body);
            updatedUser.password = undefined;

            return res.json(updatedUser);
        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }

    async delete(req, res) {
        try {
            
            if(!req.params.id) {
                return res.status(400).json({ 
                    errors: ['ID not sent.'] 
                });
            }
            
            const user = await User.findByPk(req.params.id);
            
            if(!user) {
                return res.status(400).json({ 
                    errors: ['User doesn\'t exist.'] 
                });
            }

            await user.destroy();

            return res.json(user);
        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }
}

module.exports = new UserController();
