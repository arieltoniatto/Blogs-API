const { Category } = require('../models/index');
const { validateCategory } = require('./validations/validations');

const createCategory = async ({ name }) => {
    const error = validateCategory({ name });

    console.log(error);

    if (error.type) {
        error.status = 400;
        return error;
    }

    const result = await Category.create({ name });

    return result;
};

const findAllCategories = async () => {
    const result = await Category.findAll({
        attributes: ['id', 'name'],
    });

    return result;
};

module.exports = {
    createCategory,
    findAllCategories,
};