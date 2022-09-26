const user = require('../services/user.services');

const createUser = async (req, res) => {
    const token = await user.createUser(req.body);

    if (token.type) return res.status(token.status).json({ message: token.message });

    return res.status(201).json({ token });
};

const findAllUsers = async (_req, res) => {
    const result = await user.findAllUsers();

    res.status(200).json(result);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const result = await user.findById(id);

    if (result.type) return res.status(result.status).json({ message: 'User does not exist' });

    res.status(200).json(result);
};

module.exports = {
    createUser,
    findAllUsers,
    findById,
};