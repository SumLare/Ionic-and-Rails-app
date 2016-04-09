(function(){
  'use strict';
  angular
        .module('starter.update')
        .controller('DreamUpdate', DreamUpdate);

  function DreamUpdate($state, $stateParams, $ionicHistory, Dream) {
    var vm = this;
    vm.dream = Dream.get({ id: $stateParams.id });
    vm.updateDream = updateDream;
    vm.loadDream = loadDream;
    vm.rmStep = rmStep;
    
    function updateDream() {
      vm.id = vm.dream.data.id
      Dream.update({id: vm.id},vm.dream);
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
        vm.dream.data.attributes['last-date'] = new Date(vm.dream.data.attributes['last-date']);
      });
    };

    function rmStep (step) {
      //vm.dream.included[step].$delete();
      vm.dream.included.splice(vm.dream.included.indexOf(step), 1);

    };

    vm.loadDream();
  };

})();