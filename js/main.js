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

  angular.module('myApp', ['ui.mask']).controller('MainController', MainController);

})();
