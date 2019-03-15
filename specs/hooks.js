const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('app.js')

chai.should()
chai.use(chaiHttp)

const planetsModel = server.models.planets

/* Before hooks */
before(done => {
  planetsModel.ensureIndexes(err => {
    if (err) done(err)
    done()
  })
})

/* After hooks */
after(done => {
  planetsModel.deleteOne({}, (err, docs) => {
    if (err) done(err)
    done()
  })
})
