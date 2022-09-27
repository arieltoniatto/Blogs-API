const express = require('express');
const validateToken = require('../middleware/validateToken');
const {
    createPost, getPost, getPostById, updatePost, deletePost, querySearch,
} = require('../controller/post.controller');

const routers = express.Router();

routers.post('/', validateToken, createPost);
routers.get('/', validateToken, getPost);
routers.get('/search', validateToken, querySearch);
routers.delete('/:id', validateToken, deletePost);
routers.get('/:id', validateToken, getPostById);
routers.put('/:id', validateToken, updatePost);

module.exports = routers;