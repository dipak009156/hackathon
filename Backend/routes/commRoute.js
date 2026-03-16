const express = require('express');
const router = express.Router()

const validate = require('../middlewares/validate')
const { loginSchema } = require('../validator/validator');
const { login, checkToken, logout, userInfo } = require('../controller/commCont');
const { isAuthorized, isRole } = require('../middlewares/authMiddleware')

router.get('/check-token', checkToken)
router.post('/login', validate(loginSchema), login)
router.post('/logout', isAuthorized, logout)

module.exports = router