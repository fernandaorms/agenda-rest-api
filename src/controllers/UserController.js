const User = require('../models/User');
const Contact = require('../models/Contact');
const Photo = require('../models/Photo');

class UserController {
    async create(req, res) {
        try {
            const { password_hash, created_at, updated_at, profile_picture_id, ...body } = req.body;

            const newUser = await User.create(body);

            const { id, first_name, last_name, email } = newUser;

            return res.json({ id, first_name, last_name, email });

        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }

    async index(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'first_name', 'last_name', 'email'],
                include: [
                    {
                        model: Photo,
                        attributes: ['id', 'originalname', 'filename', 'url'],
                        as: 'profile_picture',
                    },
                    {
                        model: Photo,
                        attributes: ['id', 'originalname', 'filename', 'url'],
                        as: 'photos',
                    },
                ],
            });

            return res.json(users);

        } catch (e) {
            return res.json(null);
        }
    }

    async show(req, res) {
        try {
            const user = await User.findByPk(req.userId, {
                attributes: ['id', 'first_name', 'last_name', 'email'],
                include: [
                    {
                        model: Photo,
                        attributes: ['id', 'originalname', 'filename', 'url'],
                        as: 'profile_picture',
                    },
                    {
                        model: Photo,
                        attributes: ['id', 'originalname', 'filename', 'url'],
                        as: 'photos',
                    },
                ],
            });

            if (!user) {
                return res.status(400).json({
                    errors: ['User doesn\'t exist.']
                });
            }

            return res.json(user);

        } catch (e) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {
            const user = await User.findByPk(req.userId);

            if (!user) {
                return res.status(400).json({
                    errors: ['User doesn\'t exist.']
                });
            }

            const { password_hash, created_at, updated_at, ...body } = req.body;

            if (body.profile_picture_id) {
                const photo = await Photo.findOne({ where: { id: body.profile_picture_id, user_id: user.id } });

                if (!photo) {
                    return res.status(400).json({
                        errors: ['Photo doesn\'t exist.']
                    });
                }
            }

            const updatedUser = await user.update(body);

            const { id, first_name, last_name, email, profile_picture_id } = updatedUser;

            return res.json({ id, first_name, last_name, email, profile_picture_id });

        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }

    async delete(req, res) {
        try {
            const user = await User.findByPk(req.userId);

            if (!user) {
                return res.status(400).json({
                    errors: ['User doesn\'t exist.']
                });
            }

            const contacts = await Contact.findAll({ where: { user_id: user.id } });

            if (contacts.length > 0) {
                return res.status(409).json({
                    errors: ['You need to remove associated contacts before deleting your account.']
                });
            }

            await user.destroy();

            return res.json({ deleted: true });

        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }
}

module.exports = new UserController();
