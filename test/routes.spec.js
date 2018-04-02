process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
console.log('config: ', configuration)
console.log('db: ', database)
chai.use(chaiHttp)

describe('API Routes', () => {

  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done()
        })
      })
    })
  })

  describe('GET /api/v1/items', () => {
    it('should have a GET route for items', () => {
      return chai.request(server)
      .get('/api/v1/items')
      .then(response => {
        response.should.have.status(200)
        response.should.be.json

        response.body.length.should.equal(3)
      })
      .catch(error => {
        throw error
      })
    })
  })

  describe('POST /api/v1/items', () => {
    it('should have a POST route for items', () => {
      return chai.request(server)
        .post('/api/v1/items')
        .send({
          item: 'toothpaste',
          packed: false
        })
        .then(res => {
          res.should.have.status(201)
          res.should.be.json
          res.body.should.be.a('object')

          res.body.should.have.property('id')
          res.body.id.should.be.a('number')
        })
        .catch(err => {
          throw err
        })
    })
  })
})

