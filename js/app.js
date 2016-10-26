(function () {

  'use strict';

  angular
  .module('meusus', [
    'ui.router',
    'meusus.services',
    'meusus.filters',
    'meusus.directives',
    'meusus.controllers'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    var homeState = {
      url: '/',
      templateUrl: 'template/homeView.html',
      controller: 'HomeController',
      controlelrAs: 'homeCtrl'
    };

    var unidadesState = {
      // url: '/unidades/:keywords/:coods',
      url: '/unidades',
      templateUrl: 'template/unidadesView.html',
      controller: 'UnidadesController',
      controllerAs: 'unidadeCtrl'
    };

    var unidadeDetalhesState = {
      // url: '/unidades/:descricao/:bairro/:cidade/:uf/:id',
      url: '/unidade',
      templateUrl: 'template/unidadeDetalhesView.html',
      controller: 'UnidadeDetalhesController',
      controllerAs: 'unidadeDetalheCtrl'
    };

    $stateProvider.state('home', homeState);
    $stateProvider.state('unidades', unidadesState)
    $stateProvider.state('unidadeDetalhes', unidadeDetalhesState);

    $urlRouterProvider.otherwise('/');
  });

})();
