const { param } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.planets.name.index
  const router = app.locals.routers.v1

  router.route('/planets/name/:name')
    .get(
      [
        param('name')
          .exists()
          .withMessage('O nome do planeta é obrigatório.')
          .isString()
          .withMessage('O nome do planeta deve ser string.')
      ],
      controller.getOne
    )
}