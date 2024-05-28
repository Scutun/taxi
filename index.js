require('dotenv').config()

const express =  require('express')
const app = express()
const cors = require('cors')
const passengerRoute = require('./routes/passenger.routes')

app.use(express.json())
const port = process.env.port || 3000
app.use(cors())
app.use('/api', passengerRoute)


app.listen(port, () => {
    console.log('Server work')
})