const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mysql = require('mysql2')
const config = require('./config/db')
const authRoutes = require('./routes/api/auth')
const usersRoutes = require('./routes/api/users')
const deliveryRoutes = require('./routes/api/delivery')
const materialRoutes = require('./routes/api/material')
const loadcountRoutes = require('./routes/api/loadcount')
const phasecodeRoutes = require('./routes/api/phasecode')
const jobRoutes = require('./routes/api/job')
const driverAssignmentsRoutes = require('./routes/api/driverAssignment')
const truckAssignmentRoutes = require('./routes/api/truckAssignment')

process.env.SUPPRESS_NO_CONFIG_WARNING = 'true'

const app = express()
app.use(cors({ origin: 'http://localhost:3000' }))

const port = 3001

app.use(express.json())

// Mounting the API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/delivery', deliveryRoutes)
app.use('/api/material', materialRoutes)
app.use('/api/loadcount', loadcountRoutes)
app.use('/api/phasecode', phasecodeRoutes)
app.use('/api/job', jobRoutes)
app.use('/api/driverAssignments', driverAssignmentsRoutes)
app.use('/api/truckAssignments', truckAssignmentRoutes)

// Connect Database
const db = mysql.createConnection(config.database)

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err)
    return
  }
  console.log('Connected to the MySQL server.')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
