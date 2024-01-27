const path = require('path');
const fs = require('fs');

const Photo = require('../models/Photo');

const images_path = path.resolve(__dirname, '..', '..', 'uploads', 'images');

class PhotoController {
    async create(req, res) {
        try {
            const user_id = req.userId;
            let photos = [];

            for (const file of req.files) {
                const { originalname, filename } = file;
                photos.push(await Photo.create({ originalname, filename, user_id }));
            }

            return res.json(photos);
        } catch (e) {
            return res.status(400).json({
                errors: e.errors.map((err) => err.message)
            });
        }
    }

    async index(req, res) {
        try {
            const photos = await Photo.findAll({
                where: { user_id: req.userId },
                attributes: ['id', 'originalname', 'filename', 'url'],
            });

            return res.json(photos);

        } catch (e) {
            return res.json(null);
        }
    }

    async show(req, res) {
        try {
            const photo = await Photo.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.userId,
                },
                attributes: ['id', 'originalname', 'filename', 'url'],
            });

            if (!photo) {
                return res.status(400).json({
                    errors: ['Photo doesn\'t exist.']
                });
            }

            return res.json(photo);

        } catch (e) {
            return res.json(null);
        }
    }

    async delete(req, res) {
        try {
            const photo = await Photo.findOne({ where: { id: req.params.id, user_id: req.userId } });

            if (!photo) {
                return res.status(400).json({
                    errors: ['Photo doesn\'t exist.']
                });
            }

            await photo.destroy();

            const photo_deleted = path.resolve(images_path, photo.filename);

            fs.unlink(photo_deleted, (err) => {
                if (err) {
                    return res.status(400).json({
                        errors: ['Error when trying to delete the file']
                    });
                }
            });

            return res.json({ deleted: true });

        } catch (e) {
            return res.status(400).json({
                errors: ['Error when trying to delete the file']
            });
        }
    }
}

module.exports = new PhotoController();
