const express = require('express');
const validateToken = require('../middleware/validateToken');
const { findAllCategories, createCategories } = require('../controller/categoires.controller');

const routers = express.Router();

routers.post('/', validateToken, createCategories);
routers.get('/', validateToken, findAllCategories);
routers.get('/:id', validateToken);

module.exports = routers;