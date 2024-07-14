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

// Get users by role and company code
router.get('/users', async (req, res) => {
  const { role, company_code } = req.query

  console.log('Received role:', role)
  console.log('Received company_code:', company_code)

  if (!role || !company_code) {
    return res.status(400).json({ error: 'Role and company code are required' })
  }

  const conn = db.promise()

  try {
    const [rows] = await conn.query(
      'SELECT id, name FROM users WHERE role = ? AND company_code = ?',
      [role, company_code]
    )
    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Database error', details: error.message })
  }
})

// Assign driver to super
router.post('/assign', async (req, res) => {
  const { super_id, driver_id, company_code } = req.body

  console.log('Received super_id:', super_id)
  console.log('Received driver_id:', driver_id)
  console.log('Received company_code:', company_code)

  if (!(super_id && driver_id && company_code)) {
    return res.status(400).send('All input is required')
  }

  const conn = db.promise()

  try {
    await conn.query(
      'INSERT INTO assignments (super_id, driver_id, company_code) VALUES (?, ?, ?)',
      [super_id, driver_id, company_code]
    )
    res.status(201).send('Driver assigned to Super successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

// Get assignments by company code
router.get('/assignments', async (req, res) => {
  const { company_code } = req.query

  console.log('Received company_code:', company_code)

  if (!company_code) {
    return res.status(400).json({ error: 'Company code is required' })
  }

  const conn = db.promise()

  try {
    const [rows] = await conn.query(
      `SELECT a.id, u1.name AS super_name, u2.name AS driver_name, a.company_code
       FROM assignments a
       JOIN users u1 ON a.super_id = u1.id
       JOIN users u2 ON a.driver_id = u2.id
       WHERE a.company_code = ?`,
      [company_code]
    )
    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Database error', details: error.message })
  }
})

module.exports = router
