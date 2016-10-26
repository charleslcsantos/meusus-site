(function () {

  function apiService ($http) {
    var self = this;

    var urlBase = 'http://127ag.com.br:3002';
    var config = { headers: { 'Content-Type': 'application/json' } };

    self.establishments = { endpoint: '/establishments' };
    self.establishments.GET = function (params) {
      var endpoint = urlBase + self.establishments.endpoint;
      if (typeof params === 'object') {
        config.params = params
      }
      return $http.get(endpoint, config);
    };
  };

  apiService.$inject = ['$http'];

  angular.module('meusus.services').service('apiService', apiService);

})();
