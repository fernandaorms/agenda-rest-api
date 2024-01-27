require('dotenv').config();

const port = process.env.PORT || 3000;

const images_url = `http://localhost:${port}/images/`;

module.exports = { images_url };