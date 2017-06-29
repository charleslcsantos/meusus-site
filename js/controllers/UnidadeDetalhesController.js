(function () {

  function unidadeDetalhesController ($state, $stateParams, apiService) {
    var vm = this;

    vm.keywords = $stateParams.q;
    vm.coords = $stateParams.coords;
    vm.establishment = null;

    vm.init = function (id) {
      var req = apiService.establishments.GET(id);
      req.then(function (response) {
        vm.establishment = response.data;
        console.log(vm.establishment);
      }, function (err) {
        console.error(err);
      });
    };

    vm.submitForm = function () {
      $state.go('unidades', { q: vm.keywords });
    };

    vm.endereco = function (u) {
      var endereco = [];

      angular.forEach(Object.keys(u.endereco), function (key, i) {
        if (key != 'municipio' && u.endereco[key])
          endereco.push(u.endereco[key])
      });

      return endereco.join(', ');
    };

    if ($stateParams.id) {
      vm.init($stateParams.id);
    }
  };

  unidadeDetalhesController.$inject = ['$state', '$stateParams', 'apiService'];

  angular.module('meusus.controllers').controller('UnidadeDetalhesController', unidadeDetalhesController);

})();