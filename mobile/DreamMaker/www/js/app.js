(function(){
  'use strict';

angular.module('starter')
.config(function($ionicConfigProvider, $authProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.form.toggle('large').checkbox('circle');
    $ionicConfigProvider.navBar.alignTitle('center');
    $authProvider.configure({
    apiUrl: 'http://api.dreammaker_api.dev:3000/api/v1',
    storage: 'localStorage',
    handleLoginResponse: function(resp) {
        return resp.data;
    },
  });
})
.run(['$rootScope', '$location', '$ionicPlatform', function($rootScope, $location, $ionicPlatform) {
  $rootScope.$on('auth:login-success', function() {
    $location.path('/');
  });
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'app/menu/menu.html',
    controller: 'App',
    data: {
        requireLogin: true 
      },
    resolve: {
      auth: function($auth) {
        return $auth.validateUser();
      }
    }
  })
  .state('app.login',{
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'app/login/login.html',
        controller: 'Login',
        controllerAs: 'login'
      }
    }
  })
  .state('app.registration',{
    url: '/registration',
    views: {
      'menuContent': {
        templateUrl: 'app/registration/registration.html',
        controller: 'Registration',
        controllerAs: 'reg'
      }
    }
  })
  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'app/settings/settings.html',
        controller: 'Settings',
        controllerAs: 'settings'
      }
    }
  })
  .state('app.profile', {
      url: '/profile/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/profile/profile.html',
          controller: 'Profile',
          controllerAs: 'profile'
        }
      }
    })
  .state('app.friends', {
      url: '/friends/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/friends/friends.html',
          controller: 'Friends',
          controllerAs: 'friends'
        }
      }
    })
    .state('app.dreams', {
      url: '/dreams',
      views: {
        'menuContent': {
          templateUrl: 'app/dreamlist/dreams.html',
          controller: 'DreamList',
          controllerAs: 'dreamlist'
        }
      }
    })
  .state('app.dream', {
    url: '/dreams/:id',
    views: {
      'menuContent': {
        templateUrl: 'app/dreamshow/dream.html',
        controller: 'DreamShow',
        controllerAs: 'dreamshow'
      }
    }
  })
  .state('app.create',{
    url: '/new',
    views: {
      'menuContent': {
        templateUrl: 'app/CRUD/create.html',
        controller: 'DreamCreate',
        controllerAs: 'dreamcreate'
      }
    }
  })
  .state('app.edit',{
    url: '/dreams/:id/edit',
    views: {
      'menuContent': {
        templateUrl: 'app/CRUD/update.html',
        controller: 'DreamUpdate',
        controllerAs: 'dreamupdate'
      }
    }
  })
  .state('search',{
    url: '/search',
    templateUrl: 'app/dreamlist/search.html',
    controller: 'DreamList',
    controllerAs: 'dreamlist'
  });
  
  $urlRouterProvider.otherwise('/app/login');

});
})();