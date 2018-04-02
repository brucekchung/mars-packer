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
