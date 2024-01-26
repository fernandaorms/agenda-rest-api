require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(401).json({
            errors: ['Login required']
        });
    }

    const [text, token] = authorization.split(' ');

    try {
        const userData = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id, email } = userData;

        req.userId = id;
        req.userEmail = email;

        return next();
    } catch(e) {
        return res.status(401).json({
            errors: ['Unexpected or invalid token']
        });
    }
}