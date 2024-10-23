require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const homeRoutes = require('./src/routes/homeRoutes');
const userRoutes = require('./src/routes/userRoutes');
const tokenRoutes = require('./src/routes/tokenRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const photoRoutes = require('./src/routes/photoRoutes');

const whiteListIps = process.env.WHITELIST_IPS.split(',').map(ip => ip.trim());

const corsOptions = {
    origin: (origin, callback) => {
        if(whiteListIps.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
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
