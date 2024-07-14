const express = require('express')
const router = express.Router()
const db = require('../../config/db')

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
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

module.exports = router
