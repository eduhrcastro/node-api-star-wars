const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')

chai.should()

let planet = require('specs/resources/v1/schemas/planet.js')
let planetKeys = require('specs/resources/v1/keys/planet.js')
const Planet = server.models.planets

chai.use(chaiHttp)

describe('Planets', () => {
  /* GET ONE */
  describe('GET ONE BY NAME', () => {
    it('it should successfully get one planet by name on /planets/name/:name GET', done => {
      Planet.create(planet).then(res => {
        const planetName = res.name
        chai.request(server)
          .get('/planets/name/' + planetName)
          .end((err, res) => {
            if (err) done(err)

            res.should.have.status(200)
            res.body.should.be.a('object')

            /* Correct keys passing */
            let keys = Object.keys(res.body)
            keys.should.to.eql(planetKeys)

            /* Property Name */
            res.body.should.have.property('name')
            res.body.should.have.property('name').eql(planetName)
            res.body.name.should.be.a('string')

            /* Property Climate */
            res.body.should.have.property('climate')
            res.body.climate.should.be.a('array')
            res.body.climate.forEach(climate => {
              climate.should.be.a('string')
            })

            /* Property Terrain */
            res.body.should.have.property('terrain')
            res.body.terrain.should.be.a('array')
            res.body.terrain.forEach(terrain => {
              terrain.should.be.a('string')
            })

            /* Property Films */
            res.body.should.have.property('films')
            res.body.films.should.be.a('number')
            res.body.films.should.be.at.least(-1)

            /* Property _id */
            res.body.should.have.property('_id')

            res.body.should.not.have.property('__v')

            done()
          })
      })
    })

    it('it should unsuccessful get one planet by name with invalid param name is number on /planets/name/:name GET', done => {
      chai.request(server)
        .get('/planets/name/4')
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(400)
          res.body.should.be.a('object')

          res.body.should.have.property('errorCode')
          res.body.errorCode.should.be.a('string')
          res.body.should.have.property('errorCode').eql('REQ-001')

          res.body.should.have.property('description')
          res.body.description.should.be.a('string')

          res.body.should.have.property('errors')
          res.body.errors.should.be.a('array')

          res.body.errors.forEach(item => {
            item.should.be.a('object')

            item.should.have.property('location')
            item.location.should.be.a('string')

            item.should.have.property('param')
            item.param.should.be.a('string')

            item.should.have.property('value')
            item.value.should.be.a('string')

            item.should.have.property('msg')
            item.msg.should.be.a('string')
          })

          /* Correct keys passing */
          let keys = Object.keys(res.body)
          keys.should.to.eql(['errorCode', 'description', 'errors'])

          res.body.errors.forEach(item => {
            keys = Object.keys(item)
            keys.should.to.eql(['location', 'param', 'value', 'msg'])
          })

          done()
        })
    })

    it('it should unsuccessful get one planet by name with unexists param name on /planets/name/:name GET', done => {
      chai.request(server)
        .get('/planets/name/Hoth')
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(404)
          res.body.should.be.a('object')

          /* Correct keys passing */
          let keys = Object.keys(res.body)
          keys.should.to.eql([])

          done()
        })
    })
  })
})
