const { User } = require('../models/index');
const { generateToken } = require('../utils/JWT');
const { validateUser } = require('./validations/validations');

const createUser = async ({ displayName, email, password, _image }) => {
    const error = validateUser({ displayName, email, password });

    if (error.type) {
        error.status = 400;
        return error;
    }

    const user = await User.findAll({
        attributes: ['email'],
        where: { email },
    });
    console.log(user.length);

    if (user.length !== 0) {
        const e = { type: 'INVALID_FIELDS', status: 409, message: 'User already registered' };
        return e;
    }
    return generateToken({ displayName, email });
};

module.exports = {
    createUser,
};