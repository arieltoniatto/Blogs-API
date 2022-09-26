const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const generateToken = (payload) => { 
    const token = jwt.sign(payload, TOKEN_SECRET);
    return token;
};

const authTokenValidation = async (token) => {
    // if (!token) {
    //     const e = new Error('Token not found');
    //     e.status = 401;
    //     throw e;
    // }

    try {
        const instrospection = jwt.verify(token, TOKEN_SECRET);
        return instrospection;
    } catch (e) {
        console.log('Err', e);
        const err = { status: 401, message: 'Expired or invalid token' };
        // new Error('Expired or invalid token');
        // err.status = 401;
        return err;
    }
};

module.exports = {
    generateToken,
    authTokenValidation,
};