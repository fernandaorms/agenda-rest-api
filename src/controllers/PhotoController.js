const Photo = require('../models/Photo');

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
}

module.exports = new PhotoController();
