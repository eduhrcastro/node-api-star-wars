module.exports = {
  db: {
    mongo: {
      uri: 'mongodb://localhost/starwars-dev'
    }
  },
  modules: {
    expressSession: {
      name: 'default.sid',
      secret: 'default',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: false,
        path: '/',
        maxAge: 60 * 60 * 1000
      },
      mongoStore: {
        collection: 'localsessions'
      }
    },
    helmet: {
      poweredBy: 'PHP 5.6.27'
    },
    winston: {
      transports: {
        file: {
          level: 'error',
          silent: false,
          filename: '/app.log',
          maxsize: 5242880,
          maxFiles: 5
        },
        console: {
          level: 'info',
          silent: false
        }
      }
    },
    expressWinston: {
      transports: {
        file: {
          level: 'error',
          silent: false,
          filename: '/app.log',
          maxsize: 5242880,
          maxFiles: 5
        },
        console: {
          level: 'info',
          silent: false
        }
      },
      meta: false,
      expressFormat: true
    }
  }
}
