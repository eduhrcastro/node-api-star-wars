const { param } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.planets.name.index
  const router = app.locals.routers.v1
  const customValidators = app.libs.validators.custom

  router.route('/planets/name/:name')
    .get(
      [
        param('name')
          .exists()
          .withMessage('O nome do planeta é obrigatório.')
          .isString()
          .withMessage('O nome do planeta deve ser string.')
          .custom(value => {
            return customValidators.isNotNumber(value)
          })
          .withMessage('Nome não pode ser um número.')
      ],
      controller.getOne
    )
}
