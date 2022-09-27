const service = require('../services/post.services');

const createPost = async (req, res) => {
    const auth = req.headers.authorization;
    const data = req.body;

    const result = await service.createBlogPost(data, auth);
    console.log(result);

    if (result.type) return res.status(400).json({ message: result.message });
    if (result === '"categoryIds" not found') {
        return res.status(400).json({ message: '"categoryIds" not found' });
    }
    
    return res.status(201).json(result);
};

const getPost = async (req, res) => {
    const auth = req.headers.authorization;
    const result = await service.getPost(auth);
    res.status(200).json(result);
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const result = await service.getPostById(id);

    if (!result) return res.status(404).json({ message: 'Post does not exist' });

    res.status(200).json(result);
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const content = req.body;
    const auth = req.headers.authorization;
    const result = await service.updatePost(id, content, auth);
    if (result.type === 'UNAUTHORIZED_USER') {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
    if (result.type === 'MISSING_FIELDS') {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    res.status(200).json(result);
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const auth = req.headers.authorization;
    const result = deletePost(id, auth);
    if (result.type === 'UNAUTHORIZED_USER') {
        return res.status(401).json({ message: 'Unauthorized user' });
    }
    if (result.type === 'NOT_FOUND') {
        return res.status(400).json({ message: 'Post does not exist' });
    }
    res.status(204).json();
};

const querySearch = async (req, res) => {
    const { q } = req.query;
    const result = await service.querySearch(q);
    res.status(200).json(result);
};

module.exports = {
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost,
    querySearch,
};