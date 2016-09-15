'use strict';

/*================================================
Module - Main App Module
================================================ */
angular.module('postgreDbApp', ['ui.bootstrap', 'ngRoute', 'postgreDbApp.controllers', 'postgreDbApp.services'])


.config(function ($routeProvider, $locationProvider) {

  /*================================================
  Define all the Routes
  Ref.
  https://docs.angularjs.org/api/ng/provider/$locationProvider
  ================================================ */
	$routeProvider
    
    .when('/', {
        templateUrl: 'views/main.tpl.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
    })
    
    .otherwise({
        redirectTo: '/'
    });
      

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

})
.factory('includeSessionTokenInterceptor', function() {
  return {
    request: function(config) {
      var sessionToken = localStorage.getItem('sessionToken');

      if (sessionToken) {
        config.headers.authorization = 'Basic ' + sessionToken;
      }

      return config;
    } 
  };
})
.config(function($httpProvider) {
  $httpProvider.interceptors.push('includeSessionTokenInterceptor');
});

