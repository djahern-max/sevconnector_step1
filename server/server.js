const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mysql = require('mysql2')
const config = require('../server/config/db')
const authRoutes = require('./routes/api/auth')
const usersRoutes = require('./routes/api/users')

process.env.SUPPRESS_NO_CONFIG_WARNING = 'true'

const app = express()
app.use(
  cors({
    origin: 'http://localhost:4000',
  })
)

app.use(express.json())

// Mounting the API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)

// Connect Database

const db = mysql.createConnection(config.database)

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err)
    return
  }
  console.log('Connected to the MySQL server.')
})

// Job endpoints
app.get('/api/jobs', (req, res) => {
  db.query('SELECT id, job_name FROM jobs', (err, results) => {
    if (err) {
      console.error('Error fetching jobs:', err)
      return res.status(500).json({ message: 'Error fetching jobs' })
    }
    res.json(results)
  })
})

// Material endpoints
app.get('/api/materials', (req, res) => {
  db.query('SELECT id, description FROM materials', (err, results) => {
    if (err) {
      console.error('Error fetching materials:', err)
      return res.status(500).json({ message: 'Error fetching materials' })
    }
    res.json(results)
  })
})

//Loadcount endpoints
app.get('/api/loadcounts', (req, res) => {
  db.query('SELECT id, quantity FROM loadcounts', (err, results) => {
    if (err) {
      console.error('Error fetching loadcounts:', err)
      return res.status(500).json({ message: 'Error fetching loadcounts' })
    }
    res.json(results)
  })
})

//Delivery endpoints
app.post('/api/deliveries', (req, res) => {
  const { hauledFrom, hauledTo, material, quantity } = req.body
  const sql = `
        INSERT INTO deliveries (hauledFrom, hauledTo, material, quantity)
        VALUES (?, ?, ?, ?)
    `

  db.query(sql, [hauledFrom, hauledTo, material, quantity], (err, result) => {
    if (err) {
      console.error('Error inserting data into deliveries:', err)
      return res.status(500).json({
        success: false,
        message: 'Failed to insert data into deliveries',
        error: err,
      })
    }
    res.json({
      success: true,
      message: 'Data inserted into deliveries successfully',
      id: result.insertId,
    })
  })
})

const port = process.env.PORT || 4000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
