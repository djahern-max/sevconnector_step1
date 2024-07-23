const express = require('express')
const router = express.Router()
const cors = require('cors')
require('dotenv').config()
const mysql = require('mysql2')
const config = require('../../config/db')

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

const db = mysql.createConnection(config.database)

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err)
    return
  }
  console.log('Connected to the MySQL server.')
})

router.post('/', (req, res) => {
  const { ItemID, Description } = req.body
  const sql = `INSERT INTO material (ItemID, Description) VALUES (?, ?)`

  db.query(sql, [ItemID, Description], (error, results) => {
    if (error) {
      console.error('Failed to insert data into database:', error)
      res.status(500).send('Failed to insert data into database')
    } else {
      res
        .status(201)
        .send({ message: 'Data inserted successfully', id: results.insertId })
    }
  })
})

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM material ORDER BY description ASC'
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching deliveries: ', error)
      res.status(500).send('Failed to fetch deliveries')
    } else {
      res.json(results)
    }
  })
})

module.exports = router
