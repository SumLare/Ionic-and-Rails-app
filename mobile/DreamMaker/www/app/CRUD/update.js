(function(){
  'use strict';
  angular
        .module('starter.update')
        .controller('DreamUpdate', DreamUpdate);

  function DreamUpdate($state, $stateParams, $ionicHistory, Restangular) {
    var vm = this;
  vm.steps = Restangular.one('dreams', $stateParams.id).getList('steps').$object;
  vm.dream = Restangular.one('dreams', $stateParams.id).get().$object;
    vm.updateDream = updateDream;
    vm.rmStep = rmStep;
      var step = {
        title: vm.stepTitle,
        description: vm.stepDesc,
        date: vm.stepDate,
      }
    function addStep() {
      vm.steps.push(step);
    };

    function updateDream() {
      vm.dream.put();
      Restangular.one('dreams', vm.dream.id).put(step);
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('app.dreams');
    };

  Restangular.one('dreams', $stateParams.id).get().then(function(d){
    vm.loadDream = loadDream;
    function loadDream() { 
      for (var i = 0; i < vm.steps.length; i++) {
        vm.steps[i].attributes.date = new Date(vm.steps[i].attributes.date);
      }
        vm.d = d;
      vm.d.attributes.lastDate = new Date(vm.d.attributes.lastDate);
    };
    vm.loadDream();
  });

    function rmStep (step) {
      step.remove();
      vm.steps.splice(vm.steps.indexOf(step), 1);
    };

};

})();