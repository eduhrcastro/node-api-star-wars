const { param, body } = require('express-validator/check')

module.exports = app => {
  const controller = app.controllers.v1.planets.index
  const router = app.locals.routers.v1
  const customValidators = app.libs.validators.custom

  router.route('/planets')
    .get(controller.getAll)
    .post(
      [
        body('name')
          .exists()
          .withMessage('Nome é obrigatório.')
          .isString()
          .withMessage('Nome deve ser string.')
          .custom(value => {
            return customValidators.isNotNumber(value)
          })
          .withMessage('Nome não pode ser um número.'),
        body('climate')
          .exists()
          .withMessage('Clima é obrigatório.')
          .isArray()
          .withMessage('O campo clima precisa ser um array.')
          .custom(value => {
            return customValidators.isArrayOfString(value)
          })
          .withMessage('Todos os itens do array de clima precisam ser string.'),
        body('terrain')
          .exists()
          .withMessage('Terreno é obrigatório.')
          .isArray()
          .withMessage('O campo terreno precisa ser um array.')
          .custom(value => {
            return customValidators.isArrayOfString(value)
          })
          .withMessage('Todos os itens do array de clima precisam ser string.')
      ],
      controller.create
    )

  router.route('/planets/:id')
    .get(
      [
        param('id')
          .exists()
          .withMessage('O ID do planeta é obrigatório.')
          .isString()
          .withMessage('O ID do planeta deve ser string.')
          .custom(value => {
            return customValidators.isObjectId(value)
          })
          .withMessage('ID do planeta é inválido.')
      ],
      controller.getOne
    )
    .put(
      [
        param('id')
          .exists()
          .withMessage('O ID do planeta é obrigatório.')
          .isString()
          .withMessage('O ID do planeta deve ser string.')
          .custom(value => {
            return customValidators.isObjectId(value)
          })
          .withMessage('ID do planeta é inválido.'),
        body('name')
          .optional()
          .isString()
          .withMessage('Nome deve ser string.')
          .custom(value => {
            return customValidators.isNotNumber(value)
          })
          .withMessage('Nome não pode ser um número.'),
        body('climate')
          .optional()
          .isArray()
          .withMessage('O campo clima precisa ser um array.')
          .custom(value => {
            return customValidators.isArrayOfString(value)
          })
          .withMessage('Todos os itens do array de clima precisam ser string.'),
        body('terrain')
          .optional()
          .isArray()
          .withMessage('O campo terreno precisa ser um array.')
          .custom(value => {
            return customValidators.isArrayOfString(value)
          })
          .withMessage('Todos os itens do array de clima precisam ser string.'),
        body('films')
          .optional()
          .custom(value => {
            return customValidators.isNumber(value)
          })
          .withMessage('O campo filmes precisa ser um número.')
          .custom(value => {
            return customValidators.isNumberPositive(value)
          })
          .withMessage('O campo filmes precisa ser maior ou igual a zero.')
      ],
      controller.update
    )
    .delete(
      [
        param('id')
          .exists()
          .withMessage('O ID do planeta é obrigatório.')
          .isString()
          .withMessage('O ID do planeta deve ser string.')
          .custom(value => {
            return customValidators.isObjectId(value)
          })
          .withMessage('ID do planeta é inválido.')
      ],
      controller.deleteOne
    )
}
