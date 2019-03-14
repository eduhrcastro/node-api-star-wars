const axios = require('axios')
const _ = require('lodash')

module.exports = app => {
  const lib = {}

  lib.getAll = async () => {
    let i = 0
    let page = 1
    let planets = []

    while (i < 1) {
      let response = await axios.get('https://swapi.co/api/planets?page=' + page)
      planets.push(response.data.results)
      page++
      if (response.data.next == null) { i++ }
    }

    planets = [].concat.apply([], planets)

    return planets
  }

  lib.getByName = async (name) => {
    let response = await axios.get('https://swapi.co/api/planets')
    let query = _.find(response.data.results, {'name': name})

    let page = 2
    while (query === undefined && response.data.next != null) {
      response = await axios.get('https://swapi.co/api/planets/?page=' + page)
      query = _.find(response.data.results, {'name': name})
      page++
    }

    return query
  }

  return lib
}
