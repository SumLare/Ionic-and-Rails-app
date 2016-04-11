(function(){
  'use strict';
  angular
        .module('starter.update')
        .controller('DreamUpdate', DreamUpdate);

  function DreamUpdate($state, $stateParams, $ionicHistory, Dream, Step) {
    var vm = this;

    Dream.get({ id: $stateParams.id }).$promise
                  .then(function(data) {
    vm.dream = data;
    vm.updateDream = updateDream;
    vm.loadDream = loadDream;
    vm.rmStep = rmStep;
    vm.dreamId = vm.dream.data.id;
   
    function updateDream() {
      Dream.update({id: vm.dreamId},vm.dream);
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.dreams');
    };

    function loadDream() { 
      vm.dream.$promise.then(function(data) {
        vm.dream = data;
        for (var i = 0; i < vm.dream.included.length; i++) {
          vm.dream.included[i].attributes.date = new Date(vm.dream.included[i].attributes.date);
        }
        vm.dream.data.attributes.lastDate = new Date(vm.dream.data.attributes.lastDate);
      });
    };

    function rmStep (step) {
      vm.dream.included.splice(vm.dream.included.indexOf(step), 1);

    };

    vm.loadDream();
  });
};

})();