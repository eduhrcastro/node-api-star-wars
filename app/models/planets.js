module.exports = app => {
  const mongoose = app.locals.mongoose

  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      climate: [{
        type: String,
        required: true
      }],
      terrain: [{
        type: String,
        required: true
      }],
      films: {
        type: Number,
        default: 0
      }
    },
    {
      timestamps: true
    }
  )

  return mongoose.model('Planeta', schema)
}
