class PhotoController {
    async create(req, res) {
        try {
            return res.json(req.files);
        } catch(e) {
            console.log(e);
            return res.status(400).json(err);
        }
    }
}

module.exports = new PhotoController();
