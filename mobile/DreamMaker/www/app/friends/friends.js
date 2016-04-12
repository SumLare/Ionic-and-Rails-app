(function(){
  'use strict';
  angular
        .module('starter.friends')
        .controller('Friends', Friends);

  function Friends($rootScope, $stateParams, Restangular) {
    var vm = this;
    Restangular.one('users', $stateParams.id).get().then(function (friend) {
      vm.user = friend;
    });


  };

})();