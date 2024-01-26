require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/User');

class TokenController {
    async create(req, res) {
        try {
            const { email = '', password = '' } = req.body;
        
            if(!email || !password) {
                return res.status(401).json({
                    errors: ['Invalid credentials.']
                });
            }

            const user = await User.findOne({ where: { email } });

            if(!user) {
                return res.status(401).json({ 
                    errors: ['User doesn\'t exist.'] 
                });
            }

            if(!(await user.passwordIsValid(password))) {
                return res.status(401).json({
                    errors: ['Invalid password.']
                });
            }

            const id = user.id;
            const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
                 expiresIn: process.env.TOKEN_EXPIRATION,
            });

            return res.json({ token });
        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }
}

module.exports = new TokenController();
