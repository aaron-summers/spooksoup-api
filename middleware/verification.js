const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //extract token
    const token = req.header('x-auth-token');

    if (!token) return res.status(401).send({error: "Unauthorized. Token not found."})

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SCRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Authorization Error. Invalid Token."})
    }
}