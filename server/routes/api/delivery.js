const express = require('express')
// const axios = require('axios');
const router = express.Router()

router.post('/api/delivery', (req, res) => {
  const { hauledFrom, hauledTo, material, quantity, phaseCode } = req.body
  const sql = `INSERT INTO deliveries (hauledFrom, hauledTo, material, quantity, phaseCode) VALUES (?, ?, ?, ?, ?)`

  db.query(
    sql,
    [hauledFrom, hauledTo, material, quantity, phaseCode],
    (error, results) => {
      if (error) {
        console.error('Failed to insert data into database:', error)
        res.status(500).send('Failed to insert data into database')
      } else {
        res
          .status(201)
          .send({ message: 'Data inserted successfully', id: results.insertId })
      }
    }
  )
})

router.get('/api/delivery', (req, res) => {
  const sql = 'SELECT * FROM deliveries'
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
