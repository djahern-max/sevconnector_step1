const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise') // Use 'mysql2/promise' for async/await support
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()

const router = express.Router()

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// For testing purposes, we'll use a local MySQL database
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'SevConnector',
// })

// Middleware to parse JSON request bodies
app.use(bodyParser.json())

// Create a MySQL connection pool

// Login route
router.post('/login', async (req, res) => {
  const { email, password, company_id } = req.body

  try {
    // Retrieve user from the database
    const connection = await pool.getConnection()
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE email = ? AND company_id = ?',
      [email, company_id]
    )

    connection.release() // Release the connection back to the pool
    const user = rows[0]

    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate a JWT token using the secret key from process.env
    const token = jwt.sign(
      { id: user.id, role: user.role, company_id: user.company_id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    )

    // Send the token to the client
    res.status(200).json({ message: 'Login successful', token })
  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router
