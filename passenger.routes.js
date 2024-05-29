const Router = require('express')
const router = new Router()
const passengerController = require('../controllers/passenger.controller')


router.post('/passenger', passengerController.createPassenger)
router.get('/passenger/logIn', passengerController.logPassenger)
router.get('/passenger/find/:email', passengerController.getPassenger)
router.put('/passenger/update', passengerController.updatePassenger)
router.delete('/passenger/:email', passengerController.deletePassenger)
module.exports = router