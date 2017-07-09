(function () {

  function unidadeDetalhesController ($state, $stateParams, apiService) {
    var vm = this;

    vm.keywords = $stateParams.q;
    vm.coords = $stateParams.coords;
    vm.establishment = null;

    vm.init = function (id) {
      var loader = document.getElementsByClassName('loader')[0];
      loader.className = 'loader';
      var req = apiService.establishments.GET(id);
      req.then(function (response) {
        vm.establishment = response.data;
        loader.className = 'loader hide';
      }, function (err) {
        console.error(err);
        loader.className = 'loader hide';
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