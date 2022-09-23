const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => { 
    const token = jwt.sign(payload, TOKEN_SECRET);
    console.log('tk scr', TOKEN_SECRET);
    console.log('tkn', token);
    return token;
};

const authTokenValidation = async (token) => {
    if (!token) {
        const e = new Error('Token not found');
        e.status = 401;
        throw e;
    }

    try {
        const instrospection = await jwt.verify(token, TOKEN_SECRET);
        return instrospection;
    } catch (e) {
        console.log('Err', e);
        const err = new Error('Expired or invalid token');
        err.status = 401;
        throw err;
    }
};

module.exports = {
    generateToken,
    authTokenValidation,
};