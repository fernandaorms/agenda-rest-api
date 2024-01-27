const multer = require('multer');

const multerErrorHandler = (err, req, res, next) => {
    if(err) {
        const error = {};
        error.message = 'Internal server error.';

        if (err instanceof multer.MulterError) {
            if(err.code === 'LIMIT_FILE_SIZE') error.message = err.message + '. Please upload a file up to 1 MB.';
            else if(err.code === 'LIMIT_FILE_COUNT') error.message = err.message + '. Please upload up to 5 files.';
            else if(err.code === 'LIMIT_UNEXPECTED_FILE') error.message = err.message + '. Only JPEG and PNG files are allowed.';
        }

        return res.status(400).json({
            errors: [error.message]
        });
    }

    return next();
};

module.exports = multerErrorHandler;
