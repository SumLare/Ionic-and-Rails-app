angular.module('starter.controllers', ['angular-svg-round-progress', 'countTo'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  //ionicMaterialInk.displayEffect();
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})

.controller('DreamsListCtrl', function($scope, $ionicPopup, $window, Dream) {
  //ionicMaterialInk.displayEffect();
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
.controller('DreamCreateCtrl', function($scope, $state, $stateParams, Dream){
  $scope.dream = new Dream();

  $scope.steps = [{}];
  $scope.addStep = function () {
    $scope.steps.push({});
  };

  $scope.createDream = function(){
    $scope.dream.$save(function(){

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

});
