const { validationResult } = require('express-validator/check')

module.exports = app => {
  const controller = {}
  const Planets = app.models.planets
  const response = app.libs.responses.planets

  controller.getOne = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let query = await Planets.findOne({name: req.params.name}).lean()

      res.status(200).send(response.getPlanet(query))
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
