const express = require('express');
const { createPost } = require('../controller/post.controller');
const validateToken = require('../middleware/validateToken');

const routers = express.Router();

routers.post('/', validateToken, createPost);

module.exports = routers;