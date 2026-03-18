const express = require('express');
const router = express.Router()

const { isAuthorized, isRole} = require('../middlewares/authMiddleware.js')
const { getWorker, getDevices, getManholes, startOperation, endOperation} = require('../controller/supervisorController.js')


router.get('/select-workers', isAuthorized, isRole('supervisor'), getWorker)
router.get('/select-devices', isAuthorized, isRole('supervisor'), getDevices)
router.get('/select-manholes', isAuthorized, isRole('supervisor'), getManholes)
router.post('/start-operation', isAuthorized, isRole('supervisor'), startOperation)
router.post('/end-operation', isAuthorized, isRole('supervisor'), endOperation)


module.exports = router
