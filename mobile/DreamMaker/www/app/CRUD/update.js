(function(){
  'use strict';
  angular
        .module('starter.update')
        .controller('DreamUpdate', DreamUpdate);

  function DreamUpdate($state, $stateParams, $ionicHistory, Restangular) {
    var vm = this;
  vm.steps = Restangular.one('dreams', $stateParams.id).getList('steps').$object;
  vm.dream = Restangular.one('dreams', $stateParams.id).get().$object;//.then(function(dream) {
    //vm.dream = dream;
    vm.updateDream = updateDream;

    vm.rmStep = rmStep;

    function updateDream() {
      vm.dream.put();
      // vm.steps.put({title: vm.steps.attributes.title,
      //               description: vm.steps.attributes.description,
      //               date: vm.steps.attributes.date});
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

    
  //});
};

})();