const express = require('express')
const bcrypt = require('bcryptjs')
const mysql = require('mysql2')
const config = require('../../config/db')
const pool = mysql.createConnection(config.database)
const jwt = require('jsonwebtoken')
require('dotenv').config()
const authenticateToken = require('../../middleware/authenticateToken')

const router = express.Router()

// POST endpoint for registering a new user
router.post('/register', async (req, res) => {
  const { name, email, password, role, company_code } = req.body

  if (!(name && email && password && role && company_code)) {
    return res.status(400).send('All input is required')
  }

  const conn = pool.promise()

  try {
    // Check if user already exists
    const [existingUser] = await conn.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    )

    if (existingUser.length > 0) {
      return res.status(409).send('A user with this email already exists.')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Insert new user into the database
    const [result] = await conn.query(
      'INSERT INTO users (name, email, password, role, company_code) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role, company_code]
    )

    // Create JWT token
    const token = jwt.sign(
      { user_id: result.insertId, email, role, company_code },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )

    // Send the new user's token
    res.status(201).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const conn = pool.promise()

  try {
    // Fetch user
    const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [
      email,
    ])
    if (rows.length === 0) return res.status(400).send('User not found')

    const user = rows[0]
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send('Invalid password')

    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        role: user.role,
        company_code: user.company_code,
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    )

    res.json({ token, role: user.role })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

// Example protected route using the middleware
router.get('/me', authenticateToken, (req, res) => {
  res.json({ message: 'Accessed my profile', user: req.user })
})

module.exports = router
