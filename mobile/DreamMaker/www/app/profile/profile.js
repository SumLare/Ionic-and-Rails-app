(function(){
  'use strict';
  angular
        .module('starter.profile')
        .controller('Profile', Profile);

  function Profile($rootScope, $stateParams, ionicMaterialInk, Restangular) {
    ionicMaterialInk.displayEffect();
    var vm = this;
    vm.user = Restangular.one('users', $stateParams.id).get().$object;

    Restangular.one('users', $rootScope.currentUser.id).getList('friendships')
    .then(function (friends) {
      vm.friends = friends;
      vm.follow = follow;
      vm.unfollow = unfollow;
      angular.forEach(vm.friends, function(obj){
        if(obj.attributes['friend-id'] == vm.user.id){
          vm.f = obj;
        }
      });

      function follow() {
        vm.friends.customPOST({user_id: $rootScope.currentUser.id, 
                                friend_id: vm.user.id});
      };
      function unfollow(friend) {
        friend.remove();
      };

    })
    

    
  };

})();