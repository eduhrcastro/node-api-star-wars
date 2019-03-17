const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')

chai.should()

let planet = require('specs/resources/v1/schemas/planet.js')
let planetKeys = require('specs/resources/v1/keys/planet.js')
let planetsKeys = require('specs/resources/v1/keys/planets.js')
const Planet = server.models.planets

chai.use(chaiHttp)

describe('Planets', () => {
  /* GET ALL */
  describe('GET ALL', () => {
    it('it should successfully get all planets on /planets GET', done => {
      chai.request(server)
        .get('/planets')
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(200)
          res.body.should.be.a('object')

          /* Correct keys */
          let keys = Object.keys(res.body)
          keys.should.to.eql(planetsKeys)

          /* Property Total */
          res.body.should.have.property('total')
          res.body.total.should.be.a('number')

          /* Property Per Page */
          res.body.should.have.property('perPage')
          res.body.perPage.should.be.a('number')

          /* Property Total Pages */
          res.body.should.have.property('totalPages')
          res.body.totalPages.should.be.a('number')

          /* Property Current */
          res.body.should.have.property('current')
          res.body.current.should.be.a('number')

          /* Property Next */
          res.body.should.have.property('next')
          if (res.body.next != null) { res.body.next.should.be.a('string') }

          /* Property Previous */
          res.body.should.have.property('previous')
          if (res.body.previous != null) { res.body.previous.should.be.a('string') }

          /* Property Results */
          res.body.should.have.property('results')
          res.body.results.should.be.a('array')

          res.body.results.forEach(planet => {
          /* Correct keys passing */
            keys = Object.keys(planet)
            keys.should.to.eql(planetKeys)

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

            planet.should.not.have.property('__v')
          })

          done()
        })
    })
  })

  /* CREATE */
  describe('CREATE', () => {
    it('it should successfully create a new planet on /planets POST', done => {
      chai.request(server)
        .post('/planets')
        .send(planet)
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(201)
          res.body.should.be.a('object')

          /* Correct keys passing */
          let keys = Object.keys(res.body)
          keys.should.to.eql(planetKeys)

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

          res.body.should.not.have.property('__v')

          done()
        })
    })
  })

  /* GET ONE */
  describe('GET ONE', () => {
    it('it should successfully get one planet by id on /planets/:id GET', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .get('/planets/' + planetId)
          .end((err, res) => {
            if (err) done(err)

            res.should.have.status(200)
            res.body.should.be.a('object')

            /* Correct keys passing */
            let keys = Object.keys(res.body)
            keys.should.to.eql(planetKeys)

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

            res.body.should.not.have.property('__v')

            done()
          })
      })
    })

    it('it should unsuccessful get one planet with invalid param id on /planets/:id GET', done => {
      chai.request(server)
        .get('/planets/1')
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

    it('it should unsuccessful get one planet with unexists param id on /planets/:id GET', done => {
      chai.request(server)
        .get('/planets/5c8b276073c26a41040f2c9d')
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

  /* UPDATE */
  describe('UPDATE', () => {
    it('it should successfully update only films one planet on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            films: 5
          })
          .end((err, res) => {
            if (err) done(err)

            res.should.have.status(200)
            res.body.should.be.a('object')

            /* Correct keys passing */
            let keys = Object.keys(res.body)
            keys.should.to.eql(planetKeys)

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

            res.body.should.not.have.property('__v')

            done()
          })
      })
    })

    it('it should successfully update only name one planet on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            name: 'Alderaan'
          })
          .end((err, res) => {
            if (err) done(err)

            res.should.have.status(200)
            res.body.should.be.a('object')

            /* Correct keys passing */
            let keys = Object.keys(res.body)
            keys.should.to.eql(planetKeys)

            /* Property Name */
            res.body.should.have.property('name')
            res.body.should.have.property('name').eql('Alderaan')
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

            res.body.should.not.have.property('__v')

            done()
          })
      })
    })

    it('it should successfully update only climate one planet on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            climate: ['temperate']
          })
          .end((err, res) => {
            if (err) done(err)

            res.should.have.status(200)
            res.body.should.be.a('object')

            /* Correct keys passing */
            let keys = Object.keys(res.body)
            keys.should.to.eql(planetKeys)

            /* Property Name */
            res.body.should.have.property('name')
            res.body.name.should.be.a('string')

            /* Property Climate */
            res.body.should.have.property('climate')
            res.body.should.have.property('climate').eql(['temperate'])
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

            res.body.should.not.have.property('__v')

            done()
          })
      })
    })

    it('it should successfully update only terrain one planet on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            terrain: ['grasslands', 'mountains']
          })
          .end((err, res) => {
            if (err) done(err)

            res.should.have.status(200)
            res.body.should.be.a('object')

            /* Correct keys passing */
            let keys = Object.keys(res.body)
            keys.should.to.eql(planetKeys)

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
            res.body.should.have.property('terrain').eql(['grasslands', 'mountains'])
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

            res.body.should.not.have.property('__v')

            done()
          })
      })
    })

    it('it should successfully update all fileds one planet on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            films: 5,
            name: 'Alderaan',
            climate: ['temperate'],
            terrain: ['grasslands', 'mountains']
          })
          .end((err, res) => {
            if (err) done(err)

            res.should.have.status(200)
            res.body.should.be.a('object')

            /* Correct keys passing */
            let keys = Object.keys(res.body)
            keys.should.to.eql(planetKeys)

            /* Property Name */
            res.body.should.have.property('name')
            res.body.should.have.property('name').eql('Alderaan')
            res.body.name.should.be.a('string')

            /* Property Climate */
            res.body.should.have.property('climate')
            res.body.should.have.property('climate').eql(['temperate'])
            res.body.climate.should.be.a('array')
            res.body.climate.forEach(climate => {
              climate.should.be.a('string')
            })

            /* Property Terrain */
            res.body.should.have.property('terrain')
            res.body.should.have.property('terrain').eql(['grasslands', 'mountains'])
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

            res.body.should.not.have.property('__v')

            done()
          })
      })
    })

    it('it should successfully update empty fileds one planet on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({})
          .end((err, res) => {
            if (err) done(err)

            res.should.have.status(204)
            res.body.should.be.a('object')

            /* Correct keys passing */
            let keys = Object.keys(res.body)
            keys.should.to.eql([])

            done()
          })
      })
    })

    it('it should unsuccessful update one planet without param id on /planets/:id PUT', done => {
      chai.request(server)
        .put('/planets')
        .send(planet)
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(404)
          res.body.should.be.a('object')

          res.body.should.have.property('statusCode')
          res.body.statusCode.should.be.a('number')
          res.body.should.have.property('statusCode').eql(404)

          res.body.should.have.property('errorData')
          res.body.errorData.should.be.a('object')

          res.body.errorData.should.have.property('errorCode')
          res.body.errorData.errorCode.should.be.a('string')
          res.body.errorData.should.have.property('errorCode').eql('SRV-002')

          res.body.errorData.should.have.property('description')
          res.body.errorData.description.should.be.a('string')

          /* Correct keys passing */
          let keys = Object.keys(res.body)
          keys.should.to.eql(['statusCode', 'errorData'])

          keys = Object.keys(res.body.errorData)
          keys.should.to.eql(['errorCode', 'description'])

          done()
        })
    })

    it('it should unsuccessful update one planet with invalid param id on /planets/:id PUT', done => {
      chai.request(server)
        .put('/planets/1')
        .send(planet)
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

    it('it should unsuccessful update one planet with unexists param id on /planets/:id PUT', done => {
      chai.request(server)
        .put('/planets/5c8b276073c26a41040f2c9d')
        .send(planet)
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

    it('it should unsuccessful update one planet with invalid body name on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            name: 3
          })
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

              item.should.have.property('msg')
              item.msg.should.be.a('string')
            })

            let keys = Object.keys(res.body)
            keys.should.to.eql(['errorCode', 'description', 'errors'])

            res.body.errors.forEach(item => {
              keys = Object.keys(item)
              keys.should.to.eql(['location', 'param', 'value', 'msg'])
            })

            done()
          })
      })
    })

    it('it should unsuccessful update one planet with body climate is string on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            climate: 'temperate'
          })
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

              item.should.have.property('msg')
              item.msg.should.be.a('string')
            })

            let keys = Object.keys(res.body)
            keys.should.to.eql(['errorCode', 'description', 'errors'])

            res.body.errors.forEach(item => {
              keys = Object.keys(item)
              keys.should.to.eql(['location', 'param', 'value', 'msg'])
            })

            done()
          })
      })
    })

    it('it should unsuccessful update one planet with body climate is array of mist types on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            climate: ['temperate', 4]
          })
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

              item.should.have.property('msg')
              item.msg.should.be.a('string')
            })

            let keys = Object.keys(res.body)
            keys.should.to.eql(['errorCode', 'description', 'errors'])

            res.body.errors.forEach(item => {
              keys = Object.keys(item)
              keys.should.to.eql(['location', 'param', 'value', 'msg'])
            })

            done()
          })
      })
    })

    it('it should unsuccessful update one planet with body terrain is string on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            terrain: 'grasslands'
          })
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

              item.should.have.property('msg')
              item.msg.should.be.a('string')
            })

            let keys = Object.keys(res.body)
            keys.should.to.eql(['errorCode', 'description', 'errors'])

            res.body.errors.forEach(item => {
              keys = Object.keys(item)
              keys.should.to.eql(['location', 'param', 'value', 'msg'])
            })

            done()
          })
      })
    })

    it('it should unsuccessful update one planet with body terrain is array of mist types on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            climate: ['grasslands', '4']
          })
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

              item.should.have.property('msg')
              item.msg.should.be.a('string')
            })

            let keys = Object.keys(res.body)
            keys.should.to.eql(['errorCode', 'description', 'errors'])

            res.body.errors.forEach(item => {
              keys = Object.keys(item)
              keys.should.to.eql(['location', 'param', 'value', 'msg'])
            })

            done()
          })
      })
    })

    it('it should unsuccessful update one planet with body films is string on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            films: '5'
          })
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

              item.should.have.property('msg')
              item.msg.should.be.a('string')
            })

            let keys = Object.keys(res.body)
            keys.should.to.eql(['errorCode', 'description', 'errors'])

            res.body.errors.forEach(item => {
              keys = Object.keys(item)
              keys.should.to.eql(['location', 'param', 'value', 'msg'])
            })

            done()
          })
      })
    })

    it('it should unsuccessful update one planet with body films is negative integer on /planets/:id PUT', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .put('/planets/' + planetId)
          .send({
            films: -1
          })
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

              item.should.have.property('msg')
              item.msg.should.be.a('string')
            })

            let keys = Object.keys(res.body)
            keys.should.to.eql(['errorCode', 'description', 'errors'])

            res.body.errors.forEach(item => {
              keys = Object.keys(item)
              keys.should.to.eql(['location', 'param', 'value', 'msg'])
            })

            done()
          })
      })
    })
  })

  /* DELETE ONE */
  describe('DELETE ONE', () => {
    it('it should successfully delete one planet on /planets/:id DELETE', done => {
      Planet.create(planet).then(res => {
        const planetId = res._id.toString()
        chai.request(server)
          .delete('/planets/' + planetId)
          .end((err, res) => {
            if (err) done(err)

            res.should.have.status(200)
            res.body.should.be.a('object')

            /* Correct keys passing */
            let keys = Object.keys(res.body)
            keys.should.to.eql(planetKeys)

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

            res.body.should.not.have.property('__v')

            done()
          })
      })
    })

    it('it should unsuccessful delete one planet without param id on /planets/:id DELETE', done => {
      chai.request(server)
        .delete('/planets')
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(404)
          res.body.should.be.a('object')

          res.body.should.have.property('statusCode')
          res.body.statusCode.should.be.a('number')
          res.body.should.have.property('statusCode').eql(404)

          res.body.should.have.property('errorData')
          res.body.errorData.should.be.a('object')

          res.body.errorData.should.have.property('errorCode')
          res.body.errorData.errorCode.should.be.a('string')
          res.body.errorData.should.have.property('errorCode').eql('SRV-002')

          res.body.errorData.should.have.property('description')
          res.body.errorData.description.should.be.a('string')

          /* Correct keys passing */
          let keys = Object.keys(res.body)
          keys.should.to.eql(['statusCode', 'errorData'])

          keys = Object.keys(res.body.errorData)
          keys.should.to.eql(['errorCode', 'description'])

          done()
        })
    })

    it('it should unsuccessful delete one planet with invalid param id on /planets/:id DELETE', done => {
      chai.request(server)
        .delete('/planets/1')
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

    it('it should unsuccessful delete one planet with unexists param id on /planets/:id DELETE', done => {
      chai.request(server)
        .delete('/planets/5c8b276073c26a41040f2c9d')
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
