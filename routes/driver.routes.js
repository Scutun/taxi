const Router = require('express')
const router = new Router()
const driverController = require('../controllers/driver.controller')


router.post('/driver/create', driverController.createDriver)
router.get('/driver/logIn', driverController.logDriver)
router.put('/driver/update', driverController.updateDriver)

router.delete('/driver/delete/:id', driverController.deleteDriver)
router.get('/driver/:id', driverController.getDriver)
router.get('/driver/find/:id', driverController.getDriverFromDrive)


module.exports = router