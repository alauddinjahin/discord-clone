const jwt = require("jsonwebtoken")
const config = process.env;

const varifyToken = (req, res, next )=>{
    let token = req.body.token || req.query.token || req.headers['authorization'];

    if(!token){
        return res.status(403).send("A token is required for authentication!");
    }

    try {
        token = token.replace(/^Bearer\s+/,"");
        const decodedToken = jwt.verify(token, config.JWT_TOKEN);
        req.user = decodedToken;
    } catch (error) {
        return res.status(401).send("Invalid Token!");
    }

    return next();

}


module.exports = varifyToken;