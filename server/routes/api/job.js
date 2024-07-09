const express = require('express')
// const axios = require('axios');
const router = express.Router()

router.post('/api/job', (req, res) => {
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

router.get('/api/job', (req, res) => {
  const sql = 'SELECT * FROM jobs'
  db.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching deliveries: ', error)
      res.status(500).send('Failed to fetch deliveries')
    } else {
      res.json(results)
    }
  })
})

module.exports = router
