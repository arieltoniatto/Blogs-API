const express = require('express');
const { createPost, getPost, getPostById } = require('../controller/post.controller');
const validateToken = require('../middleware/validateToken');

const routers = express.Router();

routers.post('/', validateToken, createPost);
routers.get('/', validateToken, getPost);
routers.get('/:id', validateToken, getPostById);

module.exports = routers;