const express = require('express');
const { createUser, findAllUsers, findById, deleteMe } = require('../controller/user.controller');
const validateToken = require('../middleware/validateToken');

const routers = express.Router();

routers.post('/', createUser);
routers.get('/', validateToken, findAllUsers);
routers.delete('/me', validateToken, deleteMe);
routers.get('/:id', validateToken, findById);

module.exports = routers;