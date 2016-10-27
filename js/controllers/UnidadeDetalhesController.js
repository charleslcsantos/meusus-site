(function () {

  function unidadeDetalhesController ($state, $stateParams, apiService) {
    var vm = this;

    vm.keywords = $stateParams.keywords;
    vm.coords = $stateParams.coords;
    vm.establishments = [];

    vm.init = function (keywords) {
      var req = apiService.establishments.GET({keyword: keywords});
      req.then(function (response) {
        console.log(response);
        vm.establishments = response.data;
      }, function (err) {
        console.error(err);
      });
    };

    vm.submitForm = function () {
      $state.go('unidades', { q: vm.keywords });
    };

    if ($stateParams.keywords) {
      vm.init($stateParams.keywords);
    }
  };

  unidadeDetalhesController.$inject = ['$state', '$stateParams', 'apiService'];

  angular.module('meusus.controllers').controller('UnidadeDetalhesController', unidadeDetalhesController);

})();
