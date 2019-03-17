const _ = require('lodash')

module.exports = app => {
  let lib = {}

  let keys = [
    '_id',
    'name',
    'climate',
    'terrain',
    'films',
    'createdAt',
    'updatedAt'
  ]

  lib.getPlanets = (url, query, count, page, perPage) => {
    let totalPages = Math.ceil(count / perPage)
    return {
      total: count,
      perPage: perPage,
      totalPages: totalPages,
      current: page,
      next: page === totalPages ? null : url + '/planets?page=' + (parseInt(page) + 1),
      previous: page === 1 ? null : url + '/planets?page=' + (parseInt(page) - 1),
      results: _.map(query, _.partialRight(_.pick, keys))
    }
  }

  lib.getPlanet = (planet) => {
    return _.pick(planet, keys)
  }

  return lib
}
