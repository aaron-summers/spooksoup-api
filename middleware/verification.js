const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    //extract token
    const token = req.header('Authorization');

    if (!token) return res.status(401).send({error: "Unauthorized. No Token Provided."})

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Authorization Error. Invalid Token."})
    }
}