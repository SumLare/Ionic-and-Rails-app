(function(){
  'use strict';
  angular
        .module('starter.friends')
        .controller('Friends', Friends);

  function Friends($rootScope, $stateParams, Restangular) {
    var vm = this;
    vm.users = Restangular.all('users').getList().$object;
    Restangular.one('users', $stateParams.id).getList('friendships').then(function(friendships) {
      vm.friendships = friendships;
      vm.ids = [];
      angular.forEach(vm.friendships, function(val) {
        vm.ids.push(val.attributes["friend-id"]);
      })
      vm.friends= [];
      angular.forEach(vm.users, function(val) {
        for (var i = 0; i < vm.ids.length; i++) {
          if (val.id == vm.ids[i]){
            vm.friends.push(val);
          }
        }
        
      })
    });
    
  };

})();