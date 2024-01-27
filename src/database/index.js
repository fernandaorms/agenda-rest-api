const Sequelize = require('sequelize');

const databaseConfig = require('../config/database');
const Contact = require('../models/Contact');
const User = require('../models/User');
const Photo = require('../models/Photo');

const models = [Contact, User, Photo];
const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
models.forEach(model => model.associate && model.associate(connection.models));
