const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const Contact = require('../models/Contact');
const Photo = require('../models/Photo');
const phoneValidation = require('../utils/phoneValidation');

class ContactController {
    async create(req, res) {
        try {
            const { phone, created_at, updated_at, user_id, ...body } = req.body;

            body.user_id = req.userId;

            if (body.phone_number) {
                const formattedNumber = phoneValidation(body.phone_number, body.phone_region ? body.phone_region : 'BR');

                if (!formattedNumber) {
                    return res.status(400).json({
                        errors: ['Invalid phone number for the provided region.']
                    });
                }

                body.phone = formattedNumber;
            }

            if (body.profile_picture_id) {
                const photo = await Photo.findOne({ where: { id: body.profile_picture_id, user_id: body.user_id } });

                if (!photo) {
                    return res.status(400).json({
                        errors: ['Photo doesn\'t exist.']
                    });
                }
            }

            const newContact = await Contact.create(body);

            return res.json(newContact);

        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }

    async index(req, res) {
        try {
            const contacts = await Contact.findAll({
                where: { user_id: req.userId },
                attributes: ['id', 'first_name', 'last_name', 'email', 'phone'],
                order: [['first_name', 'ASC'], ['last_name', 'ASC'],],
                include: [
                    {
                        model: Photo,
                        attributes: ['id', 'originalname', 'filename'],
                        as: 'profile_picture',
                    },
                ],
            });

            return res.json(contacts);

        } catch (e) {
            return res.json(null);
        }
    }

    async show(req, res) {
        try {
            const contact = await Contact.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.userId,
                },
                attributes: ['id', 'first_name', 'last_name', 'email', 'phone'],
                include: [
                    {
                        model: Photo,
                        attributes: ['id', 'originalname', 'filename'],
                        as: 'profile_picture',
                    },
                ],
            });

            if (!contact) {
                return res.status(400).json({
                    errors: ['Contact doesn\'t exist.']
                });
            }

            return res.json(contact);

        } catch (e) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {
            const contact = await Contact.findOne({ where: { id: req.params.id, user_id: req.userId } });

            if (!contact) {
                return res.status(400).json({
                    errors: ['Contact doesn\'t exist.']
                });
            }

            const { phone, created_at, updated_at, user_id, ...body } = req.body;

            if (body.phone_number) {
                const formattedNumber = phoneValidation(body.phone_number, body.phone_region ? body.phone_region : 'BR');

                if (!formattedNumber) {
                    return res.status(400).json({
                        errors: ['Invalid phone number for the provided region.']
                    });
                }

                body.phone = formattedNumber;
            }

            if (body.profile_picture_id) {
                const photo = await Photo.findOne({ where: { id: body.profile_picture_id, user_id: contact.user_id } });

                if (!photo) {
                    return res.status(400).json({
                        errors: ['Photo doesn\'t exist.']
                    });
                }
            }

            const updatedContact = await contact.update(body);

            return res.json(updatedContact);

        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }

    async delete(req, res) {
        try {
            const contact = await Contact.findOne({ where: { id: req.params.id, user_id: req.userId } });

            if (!contact) {
                return res.status(400).json({
                    errors: ['Contact doesn\'t exist.']
                });
            }

            await contact.destroy();

            return res.json({ deleted: true });

        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }
}

module.exports = new ContactController();
