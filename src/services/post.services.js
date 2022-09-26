const jwt = require('jsonwebtoken');
const { Category, BlogPost, User } = require('../models/index');

const verifyCategId = async (ids) => {
    const findAllIds = await Category.findAndCountAll({
        where: {
            id: ids,
        },
    });
    if (findAllIds.length === 0 || findAllIds.count !== ids.length) {
        return { type: 'INVALID_ID', message: '"categoryIds" not found' };
    }

    return { type: null, message: '' };
};

// const verifyFields = async ({ title, content, categoryIds }) => {
//     if (!title || !content || !categoryIds) {
//         return { type: 'MISSING_FIELDS', message: 'Some required fields are missing' };
//     }
    
//     return { type: null, message: '' };
// };

const getIdByToken = async (auth) => {
    const TOKEN_SECRET = process.env.JWT_SECRET;
    const user = jwt.verify(auth, TOKEN_SECRET);

    const userId = await User.findOne({
        where: { email: user.email },
    });

    return userId.dataValues;
};

const createBlogPost = async ({ title, content, categoryIds }, auth) => {
    if (!title || !content || !categoryIds) {
        return { type: 'MISSING_FIELDS', message: 'Some required fields are missing' };
    }

    const errorFields = await verifyCategId(categoryIds);

    if (errorFields) return errorFields.message;

    const user = await getIdByToken(auth);

    const newPost = await BlogPost.create({
        title, 
        content,
        userId: user.id, 
        published: new Date(),
        updated: new Date(),
     });

     return newPost;
};

module.exports = {
    createBlogPost,
};