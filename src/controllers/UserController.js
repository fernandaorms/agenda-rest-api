const User = require('../models/User');
const Student = require('../models/Student');

class UserController {
    async create(req, res) {
        try {
            const newUser = await User.create(req.body);
    
            const { id, first_name, last_name, email } = newUser;

            return res.json({ id, first_name, last_name, email });
        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }

    async index(req, res) {
        try {
            const users = await User.findAll({ attributes: ['id', 'first_name', 'last_name', 'email'] });
            
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

            const { id, first_name, last_name, email } = user;

            return res.json({ id, first_name, last_name, email });
        } catch(e) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {
            const user = await User.findByPk(req.userId);

            if(!user) {
                return res.status(400).json({ 
                    errors: ['User doesn\'t exist.'] 
                });
            }

            const body = (({ first_name, last_name, email, password }) => ({ first_name, last_name, email, password }))(req.body);

            const updatedUser = await user.update(body);

            const { id, first_name, last_name, email } = updatedUser;

            return res.json({ id, first_name, last_name, email });

        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }

    async delete(req, res) {
        try {
            const user = await User.findByPk(req.userId);
            
            if(!user) {
                return res.status(400).json({ 
                    errors: ['User doesn\'t exist.'] 
                });
            }

            const students = await Student.findAll({ where: { user_id: user.id } });

            if(students) {
                return res.status(409).json({
                    errors: ['You need to remove associated students before deleting your account.'] 
                });
            }

            await user.destroy();

            return res.json(null);
        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }
}

module.exports = new UserController();
