(function () {

  'use strict';

  angular
  .module('meusus', [
    'ui.router',
    'meusus.services',
    'meusus.filters',
    'meusus.directives',
    'meusus.controllers',
    'slugifier'
  ])
  .config(function($logProvider, $compileProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
    $locationProvider.html5Mode(true);

    var homeState = {
      url: '/',
      templateUrl: 'template/homeView.html',
      controller: 'HomeController',
      controllerAs: 'homeCtrl'
    };

    var unidadesState = {
      url: '/unidades?q&coords',
      templateUrl: 'template/unidadesView.html',
      controller: 'UnidadesController',
      controllerAs: 'unidadeCtrl'
    };

    var unidadeDetalhesState = {
      url: '/unidade/{descricao}/{bairro}/{cidade}/{uf}/{id}?q&coords',
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
