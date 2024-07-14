// server/routes/api/users.js

const express = require('express')
const bcrypt = require('bcryptjs')
const mysql = require('mysql2')
const config = require('../../config/db')
const pool = mysql.createConnection(config.database)
const jwt = require('jsonwebtoken')
require('dotenv').config()

const router = express.Router()

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

    // Send the token and role in the response
    res.json({ token, role: user.role })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

module.exports = router
