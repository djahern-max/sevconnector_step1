const express = require('express')
const bcrypt = require('bcryptjs')
const mysql = require('mysql2')
const config = require('../../config/db')
const pool = mysql.createConnection(config.database)
const jwt = require('jsonwebtoken')
require('dotenv').config()
const authenticateToken = require('../../middleware/authenticateToken')

// const JWT_SECRET = process.env.JWT_SECRET

const router = express.Router()

// POST endpoint for registering a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!(name && email && password)) {
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
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    // Create JWT token
    const token = jwt.sign(
      { user_id: result.insertId, email },
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

// Example protected route using the middleware
router.get('/me', authenticateToken, (req, res) => {
  // Assuming user data is already loaded and ID is available in JWT
  res.json({ message: 'Accessed my profile', user: req.user })
})

module.exports = router
