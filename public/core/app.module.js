var app = angular.module('App', ['modlogin', 'ngCookies']);

app.factory('httpRequestInterceptor', function () {
  return {
    request: function (config) {


      var token = window.localStorage.getItem('token');

      if (!token || token == ''){
        console.log('No hay token!')
      } else {
        console.log('Estableciendo cabecera con token = ' + token)
        // use this to destroying other existing headers
        config.headers.Authorization = 'Bearer ' + token;
      }
      // use this to prevent destroying other existing headers
      // config.headers['Authorization'] = 'authentication';
      console.log(config.headers)
      return config;
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
});




/*
app.config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('login', {
      url: "/",
      component: 'login'
    })
    .state('private', {
      url: "/private",
      templateUrl: "public/core/private/private.template.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    });
});
*/
