const multer = require('multer');
const path = require('path');

const images_path = path.resolve(__dirname, '..', '..', 'uploads', 'images');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, images_path);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E5);
        const fileExtension = path.extname(file.originalname).toLowerCase();

        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024,
        files: 5,
    }
});

module.exports = upload;
