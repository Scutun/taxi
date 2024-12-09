require("dotenv").config()
const mysql = require("mysql2")

// После выполнения запросов подключаемся к базе данных taxi
const pool = mysql
	.createPool({
		host: process.env.dbHost,
		user: process.env.dbUser,
		password: process.env.dbPassword,
		database: process.env.dbName,
	})
	.promise()

// Экспортируем подключение к базе данных taxi
module.exports = pool
