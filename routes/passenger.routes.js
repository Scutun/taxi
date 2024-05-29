const Router = require('express')
const router = new Router()
const passengerController = require('../controllers/passenger.controller')


router.post('/passenger/create', passengerController.createPassenger)
router.get('/passenger/logIn', passengerController.logPassenger)
router.put('/passenger/update', passengerController.updatePassenger)

router.delete('/passenger/delete/:id', passengerController.deletePassenger)
router.get('/passenger/:id', passengerController.getPassenger)
router.get('/passenger/find/:id', passengerController.getPassengerFromDrive)


module.exports = router