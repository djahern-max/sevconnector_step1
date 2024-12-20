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

// Route to get all trucks
router.get('/trucks', (req, res) => {
  const query = 'SELECT * FROM trucks WHERE company_code = ?'
  const { company_code } = req.query

  db.query(query, [company_code], (err, results) => {
    if (err) {
      console.error('Error fetching trucks:', err)
      return res.status(500).send('Error fetching trucks')
    }
    res.json(results)
  })
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
  const { company_code } = req.query
  const query = `
    SELECT 
      dta.id,
      t.truck_number,
      t.truck_name,
      u.name as driver_name,
      dta.company_code
    FROM 
      driver_truck_assignments dta
    JOIN 
      trucks t ON dta.truck_id = t.id
    JOIN 
      users u ON dta.driver_id = u.id
    WHERE 
      dta.company_code = ?
  `

  db.query(query, [company_code], (err, results) => {
    if (err) {
      console.error('Error fetching assignments:', err)
      return res.status(500).send('Error fetching assignments')
    }
    res.json(results)
  })
})

module.exports = router
