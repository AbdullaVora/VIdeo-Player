const jwt = require('jsonwebtoken');
const secret_key = 'Your_Secret_Key';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.sendStatus(403);

    jwt.verify(token, secret_key, (err, user) => {
        if (err) return res.sendStatus(403); 

        req.user = user; 
        next(); r
    });
};

module.exports = authenticateToken;
