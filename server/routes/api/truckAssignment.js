const express = require('express')
const router = express.Router()
const mysql = require('mysql2')
const config = require('../../config/db')

const db = mysql.createConnection(config.database)

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err)
    return
  }
  console.log('Connected to the MySQL server.')
})

// Route to assign driver to truck
router.post('/assign', (req, res) => {
  const { driver_id, truck_id, company_code } = req.body
  const query =
    'INSERT INTO driver_truck_assignments (driver_id, truck_id, company_code) VALUES (?, ?, ?)'

  db.query(query, [driver_id, truck_id, company_code], (err, result) => {
    if (err) {
      console.error('Error assigning driver to truck:', err)
      return res.status(500).send('Error assigning driver to truck')
    }
    res.send('Driver assigned to truck successfully')
  })
})

// Route to get assignments
router.get('/assignments', (req, res) => {
  const query = 'SELECT * FROM driver_truck_assignments'

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching assignments:', err)
      return res.status(500).send('Error fetching assignments')
    }
    res.json(results)
  })
})

module.exports = router
