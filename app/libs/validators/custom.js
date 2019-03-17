const _ = require('lodash')

module.exports = app => {
  const mongoose = app.locals.mongoose

  const custom = {
    isObjectId: _id => {
      return mongoose.Types.ObjectId.isValid(_id)
    },
    isArrayOfString: array => {
      return _.every(array, String)
    },
    isNumber: number => {
      return !isNaN(number)
    },
    isNumberPositive: number => {
      return number > -1
    }
  }

  return custom
}
