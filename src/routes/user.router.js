const express = require('express');
const { createUser, findAllUsers, findById, deleteMe } = require('../controller/user.controller');
const validateToken = require('../middleware/validateToken');

const routers = express.Router();

routers.post('/', createUser);
routers.get('/', validateToken, findAllUsers);
routers.get('/:id', validateToken, findById);
routers.delete('/me', validateToken, deleteMe);

module.exports = routers;