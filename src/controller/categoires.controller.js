const service = require('../services/category.services');

const findAllCategories = async (_req, res) => {
    const result = await service.findAllCategories();

    res.status(200).json(result);
};

const createCategories = async (req, res) => {
    const newCateg = req.body;

    const result = await service.createCategory(newCateg);

    if (result.type) return res.status(result.status).json({ message: '"name" is required' });

    res.status(201).json(result);
};

module.exports = {
    findAllCategories,
    createCategories,
};