(function(){
'use strict';

angular.module('starter.controllers', ['angular-svg-round-progress', 'countTo'])
.controller('AppCtrl', AppCtrl)
.controller('DreamsListCtrl', DreamsListCtrl)
.controller('DreamShowCtrl', DreamShowCtrl)
.controller('DreamCreateCtrl', DreamCreateCtrl)
.controller('DreamEditCtrl', DreamEditCtrl)
.controller('LoginCtrl', LoginCtrl)
.controller('RegCtrl', RegCtrl)
.controller('ProfileCtrl', ProfileCtrl);
AppCtrl.$inject = ['$scope', '$timeout', 'ionicMaterialInk', 'ionicMaterialMotion', '$ionicPopover'];
DreamsListCtrl.$inject = ['$scope', 'ionicMaterialInk', '$ionicPopup', '$window', 'Dream'];
DreamShowCtrl.$inject = ['ionicMaterialInk', '$stateParams', '$ionicPopup', '$window', 'Dream'];
DreamCreateCtrl.$inject = ['$state', '$stateParams', '$ionicHistory', 'Dream', 'Step'];
DreamEditCtrl.$inject = ['$state', '$stateParams', 'Dream'];
LoginCtrl.$inject = ['$state', '$auth', '$ionicHistory'];
RegCtrl.$inejct = ['$auth', '$state'];
ProfileCtrl.$inject = ['$stateParams', 'ionicMaterialInk', 'User'];


function AppCtrl($scope, $timeout, ionicMaterialInk, ionicMaterialMotion, $ionicPopover) {
  ionicMaterialMotion.fadeSlideInRight();
  ionicMaterialInk.displayEffect();

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
};
function DreamsListCtrl($scope, ionicMaterialInk, $ionicPopup, $window, Dream) {
  ionicMaterialInk.displayEffect();
  var vm = this;
  vm.deleteDream = deleteDream;
  vm.refresh = refresh;

  Dream.query(function(result){
    vm.dreams = result;
  }); 
  
  function deleteDream(dream){
      $ionicPopup.confirm({
         title: 'Отказываешься от своей мечты?',
      }).then(function(res) {
        if(res) {
            dream.$delete(function () {
            $window.location.href = '';
          })
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

function DreamShowCtrl(ionicMaterialInk, $stateParams, $ionicPopup, $window, Dream) {
  ionicMaterialInk.displayEffect();
  var vm = this;

  vm.dream = Dream.get({ id: $stateParams.id })
                  .$promise
                  .then(function(data) {
    vm.dream = data;
    vm.getProgress = getProgress;
    vm.deleteStep = deleteStep;

    function getProgress(){
      var result, count = 0;
      var number = vm.dream.included;
      for (var i = 0; i < number.length; i++) {
        if(number[i].attributes.finished == true)
          count++;
        }
      result = count / number.length * 100;
      return result;
    };

    function deleteStep(step){
      $ionicPopup.confirm({
         title: 'Точно удалить?',
      }).then(function(res) {
        if(res) {
            step.$delete(function () {
            $window.location.href = '';
          })
        };
      });
    };

  });
};
function DreamCreateCtrl($state, $stateParams, $ionicHistory, Dream, Step) {
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
      $state.go('dreams');
    });
  };
};
function DreamEditCtrl($state, $stateParams, Dream) {
  var vm = this;
  vm.dream = Dream.get({ id: $stateParams.id });
  vm.updateDream = updateDream;
  vm.loadDream = loadDream;
  vm.rmStep = rmStep;
  

  function updateDream() {
    $id = vm.dream.data.id
    Dream.update({id: $id}, vm.dream.data);
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

function LoginCtrl($state, $auth, $ionicHistory) {
  var vm = this;
  vm.loginForm = {};
  vm.doLogin = doLogin;

  function doLogin(){
    $auth.submitLogin(vm.loginForm)
      .then(function(resp) { 
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.dreams');
      });
  };
};
function RegCtrl($auth, $state) {
  var vm = this;
  vm.registrationForm = {};
  vm.handleRegBtnClick = handleRegBtnClick;
  function handleRegBtnClick() {
    $auth.submitRegistration(vm.registrationForm)
      .then(function(resp) {
        $auth.submitLogin({
          email: vm.registrationForm.email,
          password: vm.registrationForm.password
        });
      });
    }; 
};
function ProfileCtrl($stateParams, ionicMaterialInk, User) {
  var vm = this;
  ionicMaterialInk.displayEffect();
  vm.user = User.get({ id: $stateParams.id })
                .$promise
                .then(function (data) {
                  vm.user = data;
                  console.log(vm.user.id);
                });
};

})();