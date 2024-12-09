const Router = require("express")
const router = new Router()
const passengerController = require("../controllers/passenger.controller")
const checkToken = require("../middleware/checkToken")

router.use("/passenger", checkToken)

router.post("/logIn", passengerController.logPassenger)

router.post("/create", passengerController.createPassenger)
router.put("/passenger/update", passengerController.updatePassenger)

router.get("/passenger", passengerController.getPassenger)

router.delete("/passenger/delete", passengerController.deletePassenger)
router.get("/passenger/find/:id", passengerController.getPassengerFromDrive)

module.exports = router
