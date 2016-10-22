(function () {

  function homeController ($state) {
    var vm = this;

    vm.keywords = '';
    vm.coords = { lat: null, lng: null }

    vm.submitForm = function () {
      var params = { keywords: vm.keywords, coords: vm.coords };
      $state.go('results', params)
    };
  };

  homeController.$inject = ['$state'];

  angular.module('meusus.controllers').controller('HomeController', homeController);

})();