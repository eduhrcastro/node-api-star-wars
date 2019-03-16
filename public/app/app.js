'use strict'

/**
 * @ngdoc overview
 * @name dashboard
 * @description
 * # dashboardApp
 *
 * Main module of the application.
 */

angular.module('star-wars', [
  'ngRoute',
  'ngMessages',
  'ngAnimate',
  'ngSanitize'
])
  .config(($routeProvider, $locationProvider, $httpProvider) => {
    // Remove '!' from path
    $locationProvider.hashPrefix('')

    // Allow cross domain requests
    $httpProvider.defaults.withCredentials = true
    $httpProvider.defaults.useXDomain = true
    delete $httpProvider.defaults.headers.common['X-Requested-With']

    $routeProvider
      .when('/', {
        templateUrl: 'app/views/home/home.html',
        controller: 'HomeCtrl as homeCtrl'
      })
      .when('/documentation', {
        templateUrl: 'app/views/home/home.html',
        controller: 'HomeCtrl as homeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  })
