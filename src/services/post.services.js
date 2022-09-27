const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const { Category, BlogPost, User, PostCategory } = require('../models/index');

const op = sequelize.Op;

const verifyCategId = async (ids) => {
    const findAllIds = await Category.findAndCountAll({
        where: {
            id: ids,
        },
    });
    if (findAllIds.count !== ids.length) {
        return { type: 'NOT_FOUND', message: '"categoryIds" not found' };
    }
    return { type: null, message: '' };
};

const newPost = async (title, content, user) => {
    const createPost = await BlogPost.create({
        title, 
        content,
        userId: user.id, 
        published: new Date(),
        updated: new Date(),
     });
     return createPost;
};

const assignCategory = (postId, categoriesId) => {
    try {
        categoriesId.forEach(async (categ) => {
            await PostCategory.create({ postId, categoryId: categ });
        });
    } catch (err) {
        console.log('Error', err);
    }
};

const getIdByToken = async (auth) => {
    const TOKEN_SECRET = process.env.JWT_SECRET;
    const user = jwt.verify(auth, TOKEN_SECRET);

    const userId = await User.findOne({
        where: { email: user.email },
    });

    return userId.dataValues;
};

const createBlogPost = async ({ title, content, categoryIds }, auth) => {
    if (!title || !content || categoryIds.length === 0) {
        return { type: 'MISSING_FIELDS', message: 'Some required fields are missing' };
    }

    const errorFields = await verifyCategId(categoryIds);

    if (errorFields.type) return errorFields.message;

    const user = await getIdByToken(auth);

    const post = await newPost(title, content, user);
    
    assignCategory(post.dataValues.id, categoryIds);

    return post;
};

const getPost = async (auth) => {
    const { id } = await getIdByToken(auth);
    const allPosts = await BlogPost.findAll({
        where: { userId: id },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories' },
        ],
    });
    return allPosts;
};

const getPostById = async (id) => {
    const post = await BlogPost.findOne({
        where: { id },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories' },
        ],
    });

    if (!post) return null;

    return post;
};

const getUpdatedPost = async (id) => {
    const result = await getPostById(id);
    return result;
};

const updatePost = async (post, newData, auth) => {
    if (!newData.content || !newData.title) return { type: 'MISSING_FIELDS' };
    const user = await getIdByToken(auth);

    const postUpdate = await BlogPost.update({
        title: newData.title, content: newData.content, updatedAt: new Date(),
    },
    {
        where: { id: post, userId: user.id },
    });

    if (postUpdate[0] !== 0) return getUpdatedPost(postUpdate[0]);
    return { type: 'UNAUTHORIZED_USER' };
};

const deletePost = async (id, auth) => {
    const user = await getIdByToken(auth);

    const result = await getPostById(id);

    if (!result) return { type: 'NOT_FOUND' };

    const postDelete = await BlogPost.destroy({
        where: { id, userId: user.id },
    });

    if (postDelete !== 0) return null;

    return { type: 'UNAUTHORIZED_USER' };
};

const querySearch = async (q) => {
    const term = `%${q}%`;

    const search = await BlogPost.findAll({
        where: {
            [op.or]: {
                title: { [op.like]: term }, content: { [op.like]: term },
            },
        },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories' },
        ],
    });
    return search;
};

module.exports = {
    createBlogPost,
    getPost,
    getPostById,
    updatePost,
    deletePost,
    getIdByToken,
    querySearch,
};