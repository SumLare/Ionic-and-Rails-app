(function(){
  'use strict';
  angular
        .module('starter.create')
        .controller('DreamCreate', DreamCreate);

  function DreamCreate($state, $stateParams, $ionicHistory, Dream, Step) {
    var vm = this;
    vm.addStep = addStep;
    vm.rmStep = rmStep;
    vm.createDream = createDream;
    vm.dream = new Dream();
    vm.date = new Date().toISOString().split("T")[0];
    vm.step = new Step();
    vm.steps = [{}];
    function addStep() {
      vm.steps.push({title: '', description: '', date: ''});
    };
    function rmStep(step) {
      vm.steps.splice(vm.steps.indexOf(step), 1);
    };

    function createDream(){
      vm.dream.$save(function(){
        $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.dreams');
      });
    };
};

})();