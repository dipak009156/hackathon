const jwt = require('jsonwebtoken')

const isAuthorized = (req, res, next)=>{
    console.log('i entered in this')
    const token = res.cookie.token
    console.log(token)
    if (!token){
        return res.status(400).json({
            message : 'not authorized'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded;
    next();
}

module.exports = isAuthorized