require('dotenv').config();

const port = process.env.PORT || 3000;

const images_url = `${process.env.APP_URL}/images/`;

module.exports = { images_url };