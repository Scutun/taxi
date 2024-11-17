const Router = require("express")
const router = new Router()
const driveController = require("../controllers/drive.controller")
const checkToken = require("../middleware/checkToken")

router.post("/drive/create", checkToken, driveController.createDrive)

router.put("/drive/update/info", checkToken, driveController.updateDrive)

router.put("/drive/update/status/start", driveController.updateStatusStart)
router.put("/drive/update/status/finish", driveController.updateStatusFinish)
router.put("/drive/cancel", driveController.updateStatusCancel)

router.get("/drive/all", checkToken, driveController.getDrive)
router.get("/drive/current", checkToken, driveController.getOneDrive)

module.exports = router
