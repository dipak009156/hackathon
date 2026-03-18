const workerModel = require('../models/workerModel')
const supervisorModel = require('../models/supervisorModel')
const adminModel = require('../models/adminModel')
const { compare, genToken } = require('../utils/bcryptAndJwt.js')

const jwt = require('jsonwebtoken')


module.exports.login = async (req, res) => {

    const { email, password, role } = req.body
    let Model

    if (role === "admin") Model = adminModel
    else if (role === "worker") Model = workerModel
    else if (role === "supervisor") Model = supervisorModel
    else {
        return res.status(400).json({
            message: "Invalid role"
        })
    }

    const user = await Model.findOne({ email })

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isMatch = await compare(password, user.password)

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = genToken(user)

    res.cookie("token", token, {
        httpOnly: true
    })

    res.status(200).json({
        message: "Login successful", user
    })

}

module.exports.checkToken = async (req, res) => {

    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({
            message: 'not authorized'
        })
    }
    let decoded
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    } catch {
        console.log('not logged in buddy')
    }

    let Model
    if (decoded.role === "admin") Model = adminModel
    else if (decoded.role === "worker") Model = workerModel
    else if (decoded.role === "supervisor") Model = supervisorModel

    const user = await Model.findOne({ _id: decoded.id })

    res.status(200).json({
        message: "Login successful", user
    })

}

module.exports.logout = async (req, res) => {
    const token = req.cookies.token
    if (!token) return res.status(401).json({ message: 'No token provided' });

    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}

module.exports.userInfo = async (req, res) => {
    const userId = req.user.id;
    let Model;
    if (req.user.role === 'worker') Model = workerModel;
    else if (req.user.role === 'admin') Model = adminModel;
    else if (req.user.role === 'superadmin') Model = adminModel;

    const user = await Model.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
}