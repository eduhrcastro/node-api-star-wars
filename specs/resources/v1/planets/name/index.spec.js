const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')

chai.should()

let planet = require('specs/resources/v1/schemas/planet.js')
const Planet = server.models.planets

chai.use(chaiHttp)

describe('Planets By Name', () => {
  it('it should successfully get one planet by id on /planets/name/:name GET', done => {
    Planet.create(planet).then(res => {
      const planetName = res.name
      chai.request(server)
        .get('/planets/name/' + planetName)
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(200)
          res.body.should.be.a('object')

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

          done()
        })
    })
  })
})
