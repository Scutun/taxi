require('dotenv').config()

const express =  require('express')
const app = express()
const cors = require('cors')
const passengerRoute = require('./routes/passenger.routes')
const driverRoute = require('./routes/driver.routes')
const driveRoute = require('./routes/drive.routes')

app.use(express.json())
const PORT = process.env.port || 3000
app.use(cors())
app.use('/api', passengerRoute)
app.use('/api', driverRoute)
app.use('/api', driveRoute)

//app.post('/test', (req, res) => {console.log(req.body)})


app.listen(PORT, () => {
    console.log('Server work')
})