const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mysql = require('mysql2')
const config = require('../server/config/db')
const authRoutes = require('./routes/api/auth')
const usersRoutes = require('./routes/api/users')
const deliveryRoutes = require('./routes/api/delivery')
const materialRoutes = require('./routes/api/material')
const jobRoutes = require('./routes/api/job')

process.env.SUPPRESS_NO_CONFIG_WARNING = 'true'

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

const port = 4000

app.use(express.json())

// Mounting the API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/delivery', deliveryRoutes)
app.use('/api/material', materialRoutes)
app.use('/api/job', jobRoutes)
app.use('/api/phasecode', jobRoutes)

// Connect Database

const db = mysql.createConnection(config.database)

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err)
    return
  }
  console.log('Connected to the MySQL server.')
})

app.post('/api/material', (req, res) => {
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

app.get('/api/material', (req, res) => {
  const sql = 'SELECT * FROM material'
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching materials: ', error)
      res.status(500).send('Failed to fetch materials')
    } else {
      res.json(results)
    }
  })
})

app.post('/api/delivery', (req, res) => {
  const { hauledFrom, hauledTo, material, quantity, phaseCode } = req.body
  const sql = `INSERT INTO deliveries (hauledFrom, hauledTo, material, quantity, phaseCode) VALUES (?, ?, ?, ?, ?)`

  db.query(
    sql,
    [hauledFrom, hauledTo, material, quantity, phaseCode],
    (error, results) => {
      if (error) {
        console.error('Failed to insert data into database:', error)
        res.status(500).send('Failed to insert data into database')
      } else {
        res.status(201).send({
          message: 'Data inserted successfully',
          id: results.insertId,
        })
      }
    }
  )
})

app.get('/api/delivery', (req, res) => {
  const sql = 'SELECT * FROM deliveries'
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching deliveries: ', error)
      res.status(500).send('Failed to fetch deliveries')
    } else {
      res.json(results)
    }
  })
})

app.post('/api/job', (req, res) => {
  const { JobNumber, JobName } = req.body
  const sql = `INSERT INTO jobs (JobNumber, JobName) VALUES (?, ?)`

  db.query(sql, [JobNumber, JobName], (error, results) => {
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

app.get('/api/job', (req, res) => {
  const sql = 'SELECT * FROM jobs'
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching jobs: ', error)
      res.status(500).send('Failed to fetch jobs')
    } else {
      res.json(results)
    }
  })
})

app.get('/api/loadcount', (req, res) => {
  const sql = 'SELECT * FROM loadcount'
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching loadcounts: ', error)
      res.status(500).send('Failed to fetch loadcounts')
    } else {
      res.json(results)
    }
  })
})

app.post('/api/loadcount', (req, res) => {
  const { yards, type } = req.body
  const sql = `INSERT INTO loadcount (yards, type) VALUES (?, ?)`

  db.query(sql, [yards, type], (error, results) => {
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

app.get('/api/loadcount', (req, res) => {
  const sql = 'SELECT * FROM loadcount'
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching loadcounts: ', error)
      res.status(500).send('Failed to fetch loadcounts')
    } else {
      res.json(results)
    }
  })
})

app.post('/api/phasecode', (req, res) => {
  const { yards, type } = req.body
  const sql = `INSERT INTO phasecode (phaseCode) VALUES (?)`

  db.query(sql, [yards, type], (error, results) => {
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

app.get('/api/phasecode', (req, res) => {
  const sql = 'SELECT * FROM phasecode'
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching phasecode: ', error)
      res.status(500).send('Failed to fetch phasecode')
    } else {
      res.json(results)
    }
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
