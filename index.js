require("dotenv").config()
require("./db")

const express = require("express")
const app = express()
const cors = require("cors")
const passengerRoute = require("./routes/passenger.routes")
const driveRoute = require("./routes/drive.routes")

app.use(express.json())
app.use(cors())

app.use("/api", passengerRoute)
app.use("/api", driveRoute)

const PORT = process.env.PORT || 3020

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})
