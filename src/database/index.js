const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Student = require('../models/Student');
const User = require('../models/User');

const models = [Student, User];
const connection = new Sequelize(databaseConfig);

models.forEach(model => model.init(connection));
