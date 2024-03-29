require('dotenv').config();

const express = require('express');
const path = require('path');

const homeRoutes = require('./src/routes/homeRoutes');
const userRoutes = require('./src/routes/userRoutes');
const tokenRoutes = require('./src/routes/tokenRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const photoRoutes = require('./src/routes/photoRoutes');

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(express.static(path.resolve(__dirname, 'uploads')));
    }

    routes() {
        this.app.use('/', homeRoutes);
        this.app.use('/users/', userRoutes);
        this.app.use('/tokens/', tokenRoutes);
        this.app.use('/contacts/', contactRoutes);
        this.app.use('/photos/', photoRoutes);
    }
}

module.exports = new App().app;
