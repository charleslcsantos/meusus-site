(function () {

  angular.module('meusus.controllers').controller('HomeController', homeController);

  homeController.$inject = ['$state'];

  function homeController ($state) {
    var vm = this;

    vm.keywords = '';
    vm.coords = { lat: null, lng: null }
    
      var loader = document.getElementsByClassName('loader')[0];
      loader.className = 'loader hide';
    

    vm.submitForm = function () {
      $state.go('unidades', { q: vm.keywords })
    };
  };

})();
