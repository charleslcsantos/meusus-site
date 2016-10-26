(function () {
  "use strict";
//127ag.com.br:3002/establishments?keyword=suburbio
  function MainController ($scope, $filter, $interval, $http) {
    var vm = this;
    $scope.keyword = '';

    vm.search = function (arg) {
      if($scope.keyword) {
        $http({
          method: 'GET',
          url: 'http://127ag.com.br:3002/establishments?keyword='+ $scope.keyword
        }).then(function successCallback(response) {
          console.log(response)
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
      } else 
        console.log('Não tem nada');
    }
  };

  MainController.$inject = ['$scope', '$filter', '$interval', '$http'];

  angular.module('myApp', ['ui.mask', 'ui.router'])
  .controller('MainController', MainController)
  .config(function($stateProvider, $urlRouterProvider) {
    var homeState = {
      name: 'home',
      url: '/',
      templateUrl: 'template/home.html'
    };

    var resultadoState = {
      name: 'result',
      url: '/resultado',
      templateUrl: 'template/result.html'
    }
    
    var detalheState = {
      name: 'detalhe',
      url: '/detalhe',
      templateUrl: 'template/detalhe.html'
    }

    $stateProvider.state(homeState);
    $stateProvider.state(resultadoState);
    $stateProvider.state(detalheState);
    $urlRouterProvider.otherwise('/');
  });

})();
