const express = require('express');
const { createUser, findAllUsers, findById } = require('../controller/user.controller');
const validateToken = require('../middleware/validateToken');

const routers = express.Router();

routers.post('/', createUser);
routers.get('/', validateToken, findAllUsers);
routers.get('/:id', validateToken, findById);

module.exports = routers;