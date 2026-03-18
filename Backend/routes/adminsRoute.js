const express = require('express');
const router = express.Router()

const { isAuthorized, isRole } = require('../middlewares/authMiddleware')
const {getWorker, getSupervisor, getDevices, getManholes, getQuery, addWorker, addSupervisor, addDevice, addManhole} = require('../controller/adminController')


router.get('/view-workers', isAuthorized, isRole('admin'), getWorker)
router.get('/view-supervisors', isAuthorized, isRole('admin'), getSupervisor)
router.get('/view-devices', isAuthorized, isRole('admin'), getDevices)
router.get('/view-manholes', isAuthorized, isRole('admin'), getManholes)
router.get('/view-queries', isAuthorized, isRole('admin'), getQuery)

router.post('/add-worker', isAuthorized, isRole('admin'), addWorker)
router.post('/add-supervisor', isAuthorized, isRole('admin'), addSupervisor)
router.post('/add-device', isAuthorized, isRole('admin'), addDevice)
router.post('/add-manhole', isAuthorized, isRole('admin'), addManhole)


module.exports = router
