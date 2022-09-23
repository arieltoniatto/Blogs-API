const express = require('express');
const authController = require('../controller/login.controller');

const routers = express.Router();

routers.post('/', authController.auth);

module.exports = routers;