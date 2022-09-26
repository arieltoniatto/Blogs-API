const user = require('../services/user.services');

const createUser = async (req, res) => {
    const token = await user.createUser(req.body);

    if (token.type) return res.status(token.status).json({ message: token.message });

    return res.status(201).json({ token });
};

module.exports = {
    createUser,
};