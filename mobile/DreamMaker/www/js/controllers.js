angular.module('starter.controllers', ['angular-svg-round-progress', 'countTo'])

.controller('AppCtrl', function($scope, $timeout, ionicMaterialInk, ionicMaterialMotion) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    ionicMaterialMotion.fadeSlideInRight();
    ionicMaterialInk.displayEffect();


})

.controller('DreamsListCtrl', function($scope, ionicMaterialInk, $ionicPopup, $window, Dream) {
  ionicMaterialInk.displayEffect();

  Dream.query(function(result){
    $scope.dreams = result;
  }); 
  $scope.deleteDream = function(dream){
      console.log("delete");
      var confirmPopup = $ionicPopup.confirm({
         title: 'Отказываешься от своей мечты?',
      });

      confirmPopup.then(function(res) {
        if(res) {
            dream.$delete(function () {
            $window.location.href = '';
          })
        } 
      });
    };
})
.controller('DreamShowCtrl', function ($scope, $stateParams, $window, Dream) {
  $scope.dream = Dream.get({ id: $stateParams.id });
  $scope.dream.$promise.then(function(data) {
    $scope.dream = data;
    $scope.getprogress = function(){
      var result, count = 0;
      var number = $scope.dream.included;
      for (var i = 0; i < number.length; i++) {
        if(number[i].attributes.finished == true)
          count++;
        }
      result = count / number.length * 100;
      return result;
    };

  });
})
.controller('DreamCreateCtrl', function($scope, $state, $stateParams, $ionicHistory, Dream){
  $scope.dream = new Dream();

  $scope.date = new Date().toISOString().split("T")[0];
  $scope.steps = [{}];
  $scope.addStep = function () {
    $scope.dream.push({});
  };

  $scope.createDream = function(){
    $scope.dream.$save(function(){
      $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.dreams');
      $state.go('dreams');
    });
  };

})
.controller('DreamEditCtrl', function($scope, $state, $stateParams, Dream){
  $scope.dream = Dream.get({ id: $stateParams.id });
  var dream = $scope.dream;
  $scope.updateDream = function () { 
    $id = $scope.dream.data.id
    Dream.update({id: $id}, dream.data);
  };

  $scope.loadDream = function() { 
    dream.$promise.then(function(data) {
      $scope.dream = data;
      for (var i = 0; i < $scope.dream.included.length; i++) {
        $scope.dream.included[i].attributes.date = new Date($scope.dream.included[i].attributes.date);
      }
      $scope.last_date = new Date($scope.dream.data.attributes['last-date']);
    });
  };

  $scope.loadDream();

})
.controller('LoginCtrl', function ($scope, $state, $auth, $ionicHistory) {
  $scope.loginForm = {};
  $scope.doLogin = function(){
    $auth.submitLogin($scope.loginForm)
      .then(function(resp) { 
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.dreams');
      })
      .catch(function(resp) { 

      });
  };
  
})
.controller('RegCtrl', function ($scope, $auth, $state) {
  $scope.registrationForm = {};
  $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function(resp) {
          $auth.submitLogin({
            email: $scope.registrationForm.email,
            password: $scope.registrationForm.password
          });
        });
    };
})

.controller('SettingsCtrl', function ($scope, $state, $auth, ionicMaterialInk) {
  ionicMaterialInk.displayEffect();
  $scope.signOut = function(){
   $auth.signOut()
      .then(function(resp) {
        $state.go('app.login');
      })
      .catch(function(resp) {
        
      });
  }
})
.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk){
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);
    ionicMaterialInk.displayEffect();
});
