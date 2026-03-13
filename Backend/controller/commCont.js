const workerModel = require('../models/workerModel')
const supervisorModel = require('../models/supervisorModel')
const adminModel = require('../models/adminModel')
const { compare, genToken } = require('../utils/bcryptAndJwt.js')


module.exports.login = async (req, res, next) => {
    const { email, password, role } = req.body
    let user
    if (role === 'Admin') {
        user = await adminModel.findOne({ email })
        if (!user) {
            console.log('hello')
            res.status(401).json({
                message: 'Something went wrong'
            })
        }
    } else if (role === 'Worker') {
        user = await workerModel.findOne({ email })
        if (!user) {
            res.status(401).json({
                message: 'Something went wrong'
            })
        }
    } else if (role === 'Supervisor') {
        user = await supervisorModel.findOne({ email })
        if (!user) {
            res.status(401).json({
                message: 'Something went wrong'
            })
        }
    }
    console.log('hello')
    const isMatch = await compare(password, user.password);
    if(!isMatch){
        res.status(401).json({
            message : 'Something went wrong'
        })
    }

    const token = genToken(user);
    res.cookie('token', token)
    res.status(200).json({
        message : 'Successfully logged in.',
        data : user
    })
}