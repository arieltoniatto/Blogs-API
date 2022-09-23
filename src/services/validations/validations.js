const { loginSchema } = require('./schemas');

const validateLogin = (userData) => {
    const { error } = loginSchema.validate(userData);

    if (error) {
        return { type: 'MISSING_FIELDS', message: 'Some required fields are missing' };
    }

    return { type: null, message: '' };
};

module.exports = {
    validateLogin,
};