(function(){
  'use strict';
  angular
        .module('starter.friends')
        .controller('Friends', Friends);

  function Friends($rootScope, $stateParams, Restangular) {
    var vm = this;
    Restangular.all('users').getList().then(function (friends) {
      vm.friends = friends;
    
      
    });
  };

})();