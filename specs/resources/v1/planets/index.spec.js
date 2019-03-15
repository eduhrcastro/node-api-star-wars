const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')

chai.should()

let planet = require('specs/resources/v1/schemas/planet.js')
const Planet = server.models.planets

chai.use(chaiHttp)

describe('Planets', () => {
  it('it should successfully get all planets on /planets GET', done => {
    chai.request(server)
      .get('/planets')
      .end((err, res) => {
        if (err) done(err)

        res.should.have.status(200)
        res.body.should.be.a('array')

        res.body.forEach(planet => {
          /* Property Name */
          planet.should.have.property('name')
          planet.name.should.be.a('string')

          /* Property Climate */
          planet.should.have.property('climate')
          planet.climate.should.be.a('array')
          planet.climate.forEach(climate => {
            climate.should.be.a('string')
          })

          /* Property Terrain */
          planet.should.have.property('terrain')
          planet.terrain.should.be.a('array')
          planet.terrain.forEach(terrain => {
            terrain.should.be.a('string')
          })

          /* Property Films */
          planet.should.have.property('films')
          planet.films.should.be.a('number')
          planet.films.should.be.at.least(-1)

          planet.should.have.property('_id')
        })

        done()
      })
  })

  it('it should successfully create a new planet on /planets POST', done => {
    chai.request(server)
      .post('/planets')
      .send(planet)
      .end((err, res) => {
        if (err) done(err)

        res.should.have.status(201)
        res.body.should.be.a('object')

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

        /* Property Name */
        res.body.should.have.property('name')
        res.body.name.should.be.a('string')

        /* Property Films */
        res.body.should.have.property('films')
        res.body.films.should.be.a('number')
        res.body.films.should.be.at.least(-1)

        res.body.should.have.property('_id')

        done()
      })
  })

  it('it should successfully get one planet by id on /planets/:id GET', done => {
    Planet.create(planet).then(res => {
      const planetId = res._id.toString()
      chai.request(server)
        .get('/planets/' + planetId)
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(200)
          res.body.should.be.a('object')

          /* Property Name */
          res.body.should.have.property('name')
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
          res.body.should.have.property('_id').eql(planetId)

          done()
        })
    })
  })

  it('it should successfully update one planet on /planets/:id PUT', done => {
    Planet.create(planet).then(res => {
      const planetId = res._id.toString()
      res.films = 5
      chai.request(server)
        .put('/planets/' + planetId)
        .send(res)
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(200)
          res.body.should.be.a('object')

          /* Property Name */
          res.body.should.have.property('name')
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
          res.body.should.have.property('films').eql(5)
          res.body.films.should.be.a('number')
          res.body.films.should.be.at.least(-1)

          /* Property _id */
          res.body.should.have.property('_id')
          res.body.should.have.property('_id').eql(planetId)

          done()
        })
    })
  })

  it('it should successfully delete one planet on /planets/:id DELETE', done => {
    Planet.create(planet).then(res => {
      const planetId = res._id.toString()
      chai.request(server)
        .delete('/planets/' + planetId)
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(200)
          res.body.should.be.a('object')

          /* Property Name */
          res.body.should.have.property('name')
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
          res.body.should.have.property('_id').eql(planetId)

          done()
        })
    })
  })
})
