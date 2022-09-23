const LoginService = require('../services/login.services');

const auth = async (req, res) => {
        const token = await LoginService(req.body);
        if (token.type === 'MISSING_FIELDS') {
            return res.status(token.status).json({ message: token.message });
        }
        if (token.type === 'INVALID_FIELDS') {
            return res.status(token.status).json({ message: token.message });
        }
        res.status(200).json({ token });
};

module.exports = {
    auth,
};