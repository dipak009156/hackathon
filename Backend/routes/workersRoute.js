const express = require('express');
const router = express.Router()

const { isAuthorized, isRole } = require('../middlewares/authMiddleware')
const { checkOperation, addQueries, updateProfile} = require('../controller/workerController')

router.get('/check-assigned', isAuthorized, isRole('worker'), checkOperation)
router.post('/send-query', isAuthorized, isRole('worker'), addQueries)
router.post('/update-profile', isAuthorized, isRole('worker'), updateProfile)


module.exports = router
