const workerModel = require('../models/workerModel')
const supervisorModel = require('../models/supervisorModel')
const adminModel = require('../models/adminModel')
const { compare, genToken } = require('../utils/bcryptAndJwt.js')


module.exports.login = async (req, res, next) => {

    const { email, password, role } = req.body

    let Model

    if (role === "Admin") Model = adminModel
    else if (role === "Worker") Model = workerModel
    else if (role === "Supervisor") Model = supervisorModel
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
        message: "Login successful",
        data: user
    })

}