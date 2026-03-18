const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const genpass = async (password)=>{
    return await bcrypt.hash(password, 10);
    
}

const compare = async (password, hashedPass)=>{
    return await bcrypt.compare(password, hashedPass)
}

const genToken = (user)=>{
    return jwt.sign(
        {
            id: user._id, 
            role : user.role
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn : '10h'
        }
    )
}

module.exports = {
    compare,
    genToken,
    genpass
}