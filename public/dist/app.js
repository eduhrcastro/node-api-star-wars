'use strict';

/**
 * @ngdoc overview
 * @name dashboard
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */

angular.module('star-wars', ['ngRoute', 'ngMessages', 'ngAnimate', 'ngSanitize']).config(function ($routeProvider, $locationProvider, $httpProvider) {
  // Remove '!' from path
  $locationProvider.hashPrefix('');

  // Allow cross domain requests
  $httpProvider.defaults.withCredentials = true;
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $routeProvider.when('/', {
    templateUrl: 'app/views/home/home.html',
    controller: 'HomeCtrl as homeCtrl'
  }).otherwise({
    redirectTo: '/'
  });
});
'use strict';

(function () {
  angular.module('star-wars').controller('HomeCtrl', [function () {
    var vm = this;

    vm.schema = {
      'name': '',
      'climate': [],
      'terrain': [],
      'films': 0
    };

    vm.response = {
      '_id': '5c8b208e87397f3901900c0c',
      'climate': ['Arid'],
      'terrain': ['Dessert'],
      'films': 3,
      'name': 'Tatooine',
      'createdAt': '2019-03-15T03:48:30.787Z',
      'updatedAt': '2019-03-15T03:48:30.787Z',
      '__v': 0
    };
  }]);
})();
"use strict";