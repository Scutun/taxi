const Router = require('express')
const router = new Router()
const passengerController = require('../controllers/passenger.controller')


router.post('/passenger', passengerController.createPassenger)
router.get('/passenger/logIn', passengerController.logPassenger)

module.exports = router