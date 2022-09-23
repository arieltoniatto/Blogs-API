const { User } = require('../models/index');
const { validateLogin } = require('./validations/validations');
const { generateToken } = require('../utils/JWT');

const LoginService = async ({ email, password }) => {
    const error = validateLogin({ email, password });
    
    if (error.type === 'MISSING_FIELDS') {
        error.status = 400;
        return error;
    }
    const user = await User.findOne({
        attributes: ['email', 'password'],
        where: { email, password },
    });
    if (!user) {
        const e = { type: 'INVALID_FIELDS', status: 400, message: 'Invalid fields' };
        return e;
    }

    const token = generateToken({ email, password });

    return token;
};

module.exports = LoginService;