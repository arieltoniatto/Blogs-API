const express = require('express');
const { createUser } = require('../controller/user.controller');

const routers = express.Router();

routers.post('/', createUser);

module.exports = routers;