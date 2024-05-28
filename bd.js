const env = require('../taxi')

const Pool = require('pg').Pool
const pool = new Pool({
    user: bdUser,
    password: bdPassword,
    port: bdPort,
    host: bdHost,
    database: bdName
})

module.exports = pool