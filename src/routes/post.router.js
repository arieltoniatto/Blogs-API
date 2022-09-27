const express = require('express');
const { createPost, getPost } = require('../controller/post.controller');
const validateToken = require('../middleware/validateToken');

const routers = express.Router();

routers.post('/', validateToken, createPost);
routers.get('/', validateToken, getPost);

module.exports = routers;