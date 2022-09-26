const { User } = require('../models/index');
const { generateToken } = require('../utils/JWT');
const { validateUser } = require('./validations/validations');

const createUser = async ({ displayName, email, password, image }) => {
    const error = validateUser({ displayName, email, password });

    if (error.type) {
        error.status = 400;
        return error;
    }
    // console.log(email);

    const user = await User.findOne({
        where: { email },
    });
    
    console.log(user);
    if (user) {
        const e = { type: 'INVALID_FIELDS', status: 409, message: 'User already registered' };
        return e;
    }

    await User.create({
        displayName, email, password, image,
    });
    return generateToken({ displayName, email });
};

const findAllUsers = async () => {
    const result = await User.findAll({
        attributes: ['id', 'displayName', 'email', 'image'],
    });

    return result;
};

const findById = async (id) => {
    const result = await User.findOne({
        attributes: ['id', 'displayName', 'email', 'image'],
        where: { id },
    });

    if (!result) return { type: 'USER_MISSING', status: 404 };

    return result;
};

module.exports = {
    createUser,
    findAllUsers,
    findById,
};