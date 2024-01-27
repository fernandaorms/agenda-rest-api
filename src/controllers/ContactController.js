const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const Contact = require('../models/Contact');
const phoneValidation = require('../utils/phoneValidation');

class ContactController {
    async create(req, res) {
        try {
            const { first_name, last_name, email, phone_region, phone_number } = req.body;
            const user_id = req.userId;
            let phone = null;

            if(phone_number) {
                const formattedNumber = phoneValidation(phone_number, phone_region ? phone_region : 'BR');
                
                if(!formattedNumber) {
                    return res.status(400).json({
                        errors: ['Invalid phone number for the provided region.']
                    });
                }

                phone = formattedNumber;
            }

            const newContact = await Contact.create({ first_name, last_name, email, phone, user_id });

            return res.json(newContact);
        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }

    async index(req, res) {
        try {
            const contacts = await Contact.findAll({ where: { user_id: req.userId } });

            return res.json(contacts);
            
        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }

    async show(req, res) {
        try {
            const contact = await Contact.findByPk(req.params.id);

            if(!contact) {
                return res.status(400).json({ 
                    errors: ['Contact doesn\'t exist.'] 
                });
            }

            return res.json(contact);
        } catch(e) {
            return res.json(null);
        }
    }

    async update(req, res) {
        try {
            const contact = await Contact.findByPk(req.params.id);

            if(!contact) {
                return res.status(400).json({ 
                    errors: ['Contact doesn\'t exist.'] 
                });
            }

            const { first_name, last_name, email, phone_region, phone_number } = req.body;
            let phone = null;

            if(phone_number) {
                const formattedNumber = phoneValidation(phone_number, phone_region ? phone_region : 'BR');
                
                if(!formattedNumber) {
                    return res.status(400).json({
                        errors: ['Invalid phone number for the provided region.']
                    });
                }

                phone = formattedNumber;
            }


            const updatedContact = await contact.update({ first_name, last_name, email, phone });

            return res.json(updatedContact);
        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }

    async delete(req, res) {
        try {
            const contact = await Contact.findByPk(req.params.id);

            if(!contact) {
                return res.status(400).json({
                    errors: ['Contact doesn\'t exist.']
                });
            }

            await contact.destroy();

            return res.json({ delete: true });
        } catch(e) {
            return res.status(400).json({ 
                errors: e.errors.map((err) => err.message) 
            });
        }
    }



}

module.exports = new ContactController();
