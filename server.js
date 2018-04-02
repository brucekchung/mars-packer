const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const environment = process.node_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(express.static('public'))
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log('listening on 3000')
})

app.post('/api/v1/items', (req, res) => {
  if (!req.body.item) {
    return res.status(422).send({ error: 'missing item' })
  }

  database('items').insert(req.body, 'id')
    .then(project => {
      res.status(201).json({ id: project[0] })
    })
    .catch(err => {
      res.status(500).json({ err })
    })
})

app.get('/api/v1/items', (req, res) => {
  database('items').select()
    .then(item => {
      res.status(200).json(item)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
})
