(function(){
  'use strict';
  angular
        .module('starter.dreamlist')
        .controller('DreamList', DreamList);

  function DreamList($scope, ionicMaterialInk, $ionicPopup, Restangular) {
    ionicMaterialInk.displayEffect();
    var vm = this;
    var baseDreams = Restangular.all('dreams');
    baseDreams.getList().then(function(dreams) {
      vm.dreams = dreams;
    
    vm.deleteDream = deleteDream;
    vm.refresh = refresh;
    function deleteDream(dream){
      $ionicPopup.confirm({
        title: 'Отказываешься от своей мечты?',
      }).then(function(res) {
          if(res) {
            dream.remove();
            vm.dreams.splice(vm.dreams.indexOf(dream), 1);
          }
      });
    };

    function refresh(){
      baseDreams.getList().then(function(res) {
        vm.dreams = res;
        $scope.$broadcast('scroll.refreshComplete'); 
      });
    }
  }).catch(function(err) {
      handleMyError(err);
  });
};

})();