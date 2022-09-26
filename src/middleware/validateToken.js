const { authTokenValidation } = require('../utils/JWT');

module.exports = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Token not found' });

    const result = await authTokenValidation(token);
    console.log('result', result);
    if (result.status === 401) {
        return res.status(result.status).json({ message: result.message });
    }
    next();
};