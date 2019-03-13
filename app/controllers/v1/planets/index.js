const { validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')
const _ = require('lodash')

module.exports = app => {
  const controller = {}
  const Planets = app.models.planets
  const swPlanets = app.libs.starwars.planets.api

  controller.getAll = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let query = await Planets.find().lean()

      res.status(200).send(query)
    } catch (ex) {
      next(ex)
    }
  }

  controller.getOne = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let query = await Planets.findById(req.params.id).lean()

      res.status(200).send(query)
    } catch (ex) {
      next(ex)
    }
  }

  controller.create = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let bodyData = matchedData(req, { locations: ['body'] })

      let planet = await swPlanets.getByName(bodyData.name)

      bodyData['films'] = planet!=null && planet.films!=null ? planet.films.length : 0

      let query = await Planets.create(bodyData)

      res.status(201).send(query)
    } catch (ex) {
      next(ex)
    }
  }

  controller.update = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let bodyData = matchedData(req, { locations: ['body'] })

      if(_.isEmpty(bodyData))
        res.status(204).end()

      let query = await Planets.findOneAndUpdate({_id: req.params.id}, bodyData, {new: true}).lean()

      res.status(200).send(query)
    } catch (ex) {
      next(ex)
    }
  }

  controller.deleteOne = async (req, res, next) => {
    try {
      validationResult(req).throw()

      let query = await Planets.findOneAndDelete({_id: req.params.id})

      res.status(200).send(query)
    } catch (ex) {
      next(ex)
    }
  }

  return controller
}
