(function(){
  'use strict';
  angular
        .module('starter.dreamlist')
        .controller('DreamList', DreamList);

  function DreamList($scope, ionicMaterialInk, $ionicPopup, $window, Dream) {
    ionicMaterialInk.displayEffect();
    var vm = this;
    Dream.query(function(result){
      vm.dreams = result;
    }); 
    vm.deleteDream = deleteDream;
    vm.refresh = refresh;

    function deleteDream(dream){
      $ionicPopup.confirm({
        title: 'Отказываешься от своей мечты?',
      }).then(function(res) {
          if(res) {
            Dream.delete(dream);
          }
      });
    };

    function refresh(){
      Dream.query(function(result){
        vm.dreams = result;
        $scope.$broadcast('scroll.refreshComplete');
      });  
    }
};

})();