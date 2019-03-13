const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

module.exports = app => {
  const config = app.locals.config
  const mongoose = app.locals.mongoose

  const userSession = session({
    name: config.modules.expressSession.name,
    secret: config.modules.expressSession.secret,
    resave: config.modules.expressSession.resave,
    saveUninitialized: config.modules.expressSession.saveUninitialized,
    cookie: config.modules.expressSession.cookie,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: config.modules.expressSession.mongoStore.collection
    })
  })

  return userSession
}
