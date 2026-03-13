const express = require('express');
const router = express();

const validate = require('../middlewares/validate')
const { loginSchema } = require('../validator/validator');
const { login } = require('../controller/commCont');
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, (req, res)=>{
    res.send('successfully working of this ')
})
router.post('/login', validate(loginSchema), login)


module.exports = router
