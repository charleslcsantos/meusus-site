(function () {

  function unidadesController ($state, $stateParams, apiService, $location) {
    var vm = this;

    vm.keywords = $stateParams.q;
    vm.coords = $stateParams.coords;
    vm.establishments = [];

    vm.init = function (keywords) {
      var req = apiService.establishments.GET({keyword: keywords});
      req.then(function (response) {
        console.log(response);
        vm.establishments = response.data;
        console.log(vm.establishments[0]);
      }, function (err) {
        console.error(err);
      });
    };

    vm.submitForm = function () {
      $state.go('unidades', { q: vm.keywords });
    };

    vm.endereco = function (u) {
      var endereco = [];

      angular.forEach(Object.keys(u.obj.endereco), function (key, i) {
        if (key != 'municipio' && u.obj.endereco[key])
          endereco.push(u.obj.endereco[key])
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
