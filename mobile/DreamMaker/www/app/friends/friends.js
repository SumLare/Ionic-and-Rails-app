(function(){
  'use strict';
  angular
        .module('starter.friends')
        .controller('Friends', Friends);

  function Friends($rootScope, $stateParams, Restangular) {
    var vm = this;
    vm.friends = Restangular.one('users', $stateParams.id)
                            .getList('friendships').$object;
  };

})();