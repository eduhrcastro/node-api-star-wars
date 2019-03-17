module.exports = app => {
  const mongoose = app.locals.mongoose

  const custom = {
    isObjectId: _id => {
      return mongoose.Types.ObjectId.isValid(_id)
    },
    isArrayOfString: array => {
      let i = 0
      while (i < array.length && typeof array[i] === 'string' && isNaN(array[i])) { i++ }
      return i === array.length
    },
    isNumber: number => {
      return typeof number === 'number' && !isNaN(number)
    },
    isNumberPositive: number => {
      return typeof number === 'number' && number > -1
    }
  }

  return custom
}
