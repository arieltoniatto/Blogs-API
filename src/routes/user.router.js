const express = require('express');
const { createUser, findAllUsers } = require('../controller/user.controller');
const validateToken = require('../middleware/validateToken');

const routers = express.Router();

routers.post('/', createUser);
routers.get('/', validateToken, findAllUsers);

module.exports = routers;