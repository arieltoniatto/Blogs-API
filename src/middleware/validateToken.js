const { authTokenValidation } = require('../utils/JWT');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const result = authTokenValidation(token);
    if (result.status === 401) {
        return res.status(result.status).json(result.message);
    }
    next();
};