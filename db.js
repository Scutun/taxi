const Pool = require('pg').Pool
const pool = new Pool({
    user: process.env.bdUser,
    password: process.env.bdPassword,
    port: process.env.bdPort,
    host: process.env.bdHost,
    database: process.env.bdName
})

module.exports = pool