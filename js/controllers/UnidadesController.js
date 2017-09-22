(function () {

  function unidadesController ($state, $stateParams, apiService, $location) {
    var vm = this;

    vm.keywords = $stateParams.q;
    vm.coords = $stateParams.coords;
    vm.establishments = [];

    vm.init = function (keywords) {
      var loader = document.getElementsByClassName('loader')[0];
      loader.className = 'loader';
      var req = apiService.establishments.GET({keyword: keywords});
      req.then(function (response) {
        vm.establishments = response.data;
        loader.className = 'loader hide';
      }, function (err) {
        loader.className = 'loader hide';
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

    if ($stateParams.q) {
      vm.init($stateParams.q);
    }
  };

  unidadesController.$inject = ['$state', '$stateParams', 'apiService', '$location'];

  angular.module('meusus.controllers').controller('UnidadesController', unidadesController);

})();
