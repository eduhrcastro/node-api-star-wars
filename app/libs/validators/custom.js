module.exports = app => {
  const mongoose = app.locals.mongoose

  const custom = {
    isObjectId: _id => {
      return mongoose.Types.ObjectId.isValid(_id)
    },
    isArrayOfString: array => {
      let i = 0
      while (i < array.length && typeof array[i] === 'string') { i++ }
      return i === array.length
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
