const jwt = require('jsonwebtoken')

const isAuthorizes = (req, res, next)=>{
    const token = res.cookie.token
    
    if (!token){
        return res.status(400).json({
            message : 'not authorized'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded;
    next();

}

module.exports = isAuthorizes