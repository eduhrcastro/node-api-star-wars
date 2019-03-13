process.env.NODE_ENV = process.env.NODE_ENV || 'development'
require('app-module-path').addPath(__dirname)
const http = require('http')
const app = require('./config/express')()
app.base = __dirname
const server = http.createServer(app)

server.listen(process.env.PORT || 5000, () => {
  app.locals.logger.info(
    'Express Server - Listening on port: ' +
      app.get('port') +
      ' - Env: ' +
      app.get('env')
  )
})

/* Export app for Mocha tests */
module.exports = app
