const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development'
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

app.delete('/api/v1/items/:id', (req, res) => {
  database('items').where('id', req.params.id).del()
    .then(item => {
      res.status(200)
    })
    .catch(err => {
      res.status(500).json({ err })
    })
})

app.patch('/api/v1/items/:id', (req, res) => {
  database('items').where('packed', req.params.id)
    .update({
      packed: req.body.packed
    })
    .then(item => {
      if (item) {
        res.status(202).send('edited')
      } else {
        res.status(404).send('failed to edit')
      }
    })
    .catch(err => res.status(500).json({ err }))
})

module.exports = app
