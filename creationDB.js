require("dotenv").config()
const mysql = require("mysql2")
const fs = require("fs")
const path = require("path")

// Создаем подключение к серверу MySQL
const connection = mysql.createConnection({
  host: process.env.dbHost,
  user: process.env.dbUser,
  password: process.env.dbPassword,
  multipleStatements: true, // для выполнения нескольких SQL-запросов
})

// Путь к файлу database.sql
const sqlFilePath = path.join(__dirname, "database.sql")

// Читаем содержимое файла
fs.readFile(sqlFilePath, "utf-8", (err, sqlQuery) => {
  if (err) {
    console.error("Ошибка при чтении файла database.sql:", err)
    return
  }

  // Подключаемся и выполняем SQL-запросы
  connection.connect((err) => {
    if (err) {
      console.error("Ошибка подключения к серверу MySQL:", err.stack)
      return
    }
    console.log("Подключение к серверу MySQL установлено.")

    // Выполняем SQL-запросы из файла
    connection.query(sqlQuery, (err, results) => {
      if (err) {
        console.error("Ошибка при выполнении SQL-запросов из файла:", err.stack)
      } else {
        console.log("SQL-запросы из файла успешно выполнены.")

        // Закрываем подключение connection
        connection.end((err) => {
          if (err) {
            console.error("Ошибка при закрытии подключения connection:", err.stack)
          } else {
            console.log("Подключение connection успешно закрыто.")
          }
        })
      }
    })
  })
})
