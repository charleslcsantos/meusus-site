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

    var unidadeState = {
      url: '/unidades/:keywords/:coods',
      templateUrl: 'template/Unidades.html',
      controller: 'UnidadesController',
      controllerAs: 'unidadeCtrl'
    };

    var unidadeDetalheState = {
      url: '/unidades/:descricao/:bairro/:cidade/:uf/:id',
      templateUrl: 'template/unidadeDetalheView.html',
      controller: 'UnidadeDetalheController',
      controllerAs: 'unidadeDetalheCtrl'
    };

    $stateProvider.state('home', homeState);
    $stateProvider.state('unidade', unidadeState)
    $stateProvider.state('unidadeDetail', unidadeState);

    $urlRouterProvider.otherwise('/');
  });

})();
