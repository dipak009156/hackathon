const express = require('express');
const router = express();

const validate = require('../middlewares/validate')
const { loginSchema } = require('../validator/validator');
const { login, checkToken } = require('../controller/commCont');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/check-token', checkToken)
router.post('/login', validate(loginSchema), login)


module.exports = router