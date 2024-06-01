const Router = require('express')
const router = new Router()
const driveController = require('../controllers/drive.controller')


router.post('/drive/create', driveController.createDrive)
router.put('/drive/update/info', driveController.updateDrive)
router.put('/drive/update/status/start', driveController.updateStatusStart)
router.put('/drive/update/status/finish', driveController.updateStatusFinish)

router.delete('/drive/cancel/:id', driveController.deleteDriver)
router.get('/drive/:id', driveController.getDrive)
router.get('/drive/current/:id', driveController.getOneDrive)


module.exports = router