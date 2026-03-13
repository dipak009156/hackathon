const express = require('express');
const router = express();

const validate = require('../middlewares/validate')
const { loginSchema } = require('../validator/validator');
const { login } = require('../controller/commCont');

router.post('/login', validate(loginSchema), login)

module.exports = router
