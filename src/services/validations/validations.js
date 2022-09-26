const { loginSchema, userSchema, categorySchema } = require('./schemas');

const validateLogin = (userData) => {
    const { error } = loginSchema.validate(userData);

    if (error) {
        return { type: 'MISSING_FIELDS', message: 'Some required fields are missing' };
    }

    return { type: null, message: '' };
};

const validateUser = (userData) => {
    const { error } = userSchema.validate(userData);

    if (error) return { type: 'INVALID_FIELDS', message: error.message };

    return { type: null, message: '' };
};

const validateCategory = (data) => {
    const { error } = categorySchema.validate(data);

    console.log(error);

    if (error) return { type: 'MISSING_FIELDS', message: error.message };

    return { type: null, message: '' };
};

module.exports = {
    validateLogin,
    validateUser,
    validateCategory,
};