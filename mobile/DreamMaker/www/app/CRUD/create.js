(function(){
  'use strict';
  angular
        .module('starter.create')
        .controller('DreamCreate', DreamCreate);

  function DreamCreate($rootScope, $state, $stateParams, $ionicHistory, Restangular, Dream, Step) {
    var vm = this;
    vm.addStep = addStep;
    vm.rmStep = rmStep;
    vm.createDream = createDream;
    //vm.dream = new Dream();

    vm.date = new Date().toISOString().split("T")[0];
    vm.step = new Step();
    vm.steps = [{}];
    function addStep() {
      angular.forEach(vm.step, function(el){
        vm.steps.push(el);
      })
    };
    function rmStep(step) {
      vm.steps.splice(vm.steps.indexOf(step), 1);
    };

    function createDream(){
      Restangular.all('dreams').post();
        $ionicHistory.nextViewOptions({
            disableBack: true
          });
          $state.go('app.dreams');
      
    };
};

})();