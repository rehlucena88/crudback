const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const { query } = require('express')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost',
  password: 'root1006',
  database: 'crud'
})

app.post('/create', (req, res) => {
  console.log(req.body)
  const number = req.body.number
  const product = req.body.product

  db.query(
    'INSERT INTO pneutable (number, product) VALUES (?,?)',
    [number, product],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('dados inseridos')
      }
    }
  )
})

app.get('/products', (req, res) => {
  db.query('SELECT * FROM pneutable', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.delete('/delete/:number', (req, res) => {
  const number = req.params.number
  db.query('DELETE FROM pneutable WHERE number = ?', number, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.listen(3002, () => {
  console.log(' o servidor esta rodando na port 3002')
})
