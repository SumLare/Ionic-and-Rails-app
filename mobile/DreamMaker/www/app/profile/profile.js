(function(){
  'use strict';
  angular
        .module('starter.profile')
        .controller('Profile', Profile);

  function Profile($rootScope, $stateParams, ionicMaterialInk, Restangular) {
    ionicMaterialInk.displayEffect();
    var vm = this;
    vm.user = Restangular.one('users', $stateParams.id).get().$object;
    Restangular.all('friendships').getList().then(function (friends) {
      vm.friends = friends;
    });
    
    vm.follow = follow;
    vm.unfollow = unfollow;

    function follow() {
      Restangular.all('friendships')
                 .customPOST({user_id: $rootScope.currentUser.id, 
                              friend_id: vm.user.data.id});
    };
    function unfollow(friend) {
      friend.remove();
    };

    
  };

})();