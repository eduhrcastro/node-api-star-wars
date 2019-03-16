(() => {
  angular.module('star-wars').controller('HomeCtrl', [
    function () {
      let vm = this

      vm.schema = {
        'name': '',
        'climate': [],
        'terrain': [],
        'films': 0
      }

      vm.response = {
        '_id': '5c8b208e87397f3901900c0c',
        'climate': [
          'Arid'
        ],
        'terrain': [
          'Dessert'
        ],
        'films': 3,
        'name': 'Tatooine',
        'createdAt': '2019-03-15T03:48:30.787Z',
        'updatedAt': '2019-03-15T03:48:30.787Z',
        '__v': 0
      }
    }])
})()
