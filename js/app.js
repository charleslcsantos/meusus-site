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
  .config(function($locationProvider, $stateProvider, $urlRouterProvider) {
    
    // $locationProvider.html5Mode(true);

    var homeState = {
      url: '/',
      templateUrl: 'template/homeView.html',
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    };

    var unidadesState = {
      url: '/unidades/{keywords}',
      templateUrl: 'template/unidadesView.html',
      controller: 'UnidadesController',
      controllerAs: 'unidadeCtrl'
    };

    var unidadeDetalhesState = {
      url: '/unidade/{descricao}/{bairro}/{cidade}/{uf}/{id}',
      templateUrl: 'template/unidadeDetalhesView.html',
      controller: 'UnidadeDetalhesController',
      controllerAs: 'unidadeDetalheCtrl'
    };

    $stateProvider.state('home', homeState);
    $stateProvider.state('unidades', unidadesState);
    $stateProvider.state('unidadeDetalhes', unidadeDetalhesState);

    $urlRouterProvider.otherwise('/');
  });

})();
