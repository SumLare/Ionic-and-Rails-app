(function(){
  'use strict';

angular.module('starter')
.config(function($ionicConfigProvider, $authProvider, RestangularProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.form.toggle('large');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.form.toggle('large').checkbox('circle');
    RestangularProvider.setBaseUrl('http://api.dreammaker_api.dev:3000');
    RestangularProvider.addResponseInterceptor(function(data, operation) {
      var extractedData = data.data;
      return extractedData;
    });

    $authProvider.configure({
    apiUrl: 'http://api.dreammaker_api.dev:3000/api/v1',
    storage: 'localStorage',
    handleLoginResponse: function(resp) {
        return resp.data;
    },
  });
})
.run(['$rootScope', '$location', '$ionicPlatform', function($rootScope, $location, $ionicPlatform, $cordovaSplashScreen) {
  $rootScope.$on('auth:login-success', function() {
    $location.path('/');
  });
  $ionicPlatform.ready(function() {
    setTimeout(function() {
      $cordovaSplashScreen.hide()
    }, 5000);
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
      }
  })
  .state('app.profile', {
      url: '/profile/:id',
      views: {
        'menuContent': {
          templateUrl: 'app/profile/profile.html',
          controller: 'Profile',
          controllerAs: 'vm'
        }
      }
    })
  .state('app.login',{
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'app/login/login.html',
        controller: 'Login',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.registration',{
    url: '/registration',
    views: {
      'menuContent': {
        templateUrl: 'app/registration/registration.html',
        controller: 'Registration',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.settings', {
    url: '/users/:id/settings',
    views: {
      'menuContent': {
        templateUrl: 'app/settings/settings.html',
        controller: 'Settings',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.confidentiality', {
    url: '/users/:id/settings/confidentiality',
    views: {
      'menuContent': {
        templateUrl: 'app/settings/confidentiality.html',
        controller: 'Settings',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.reference', {
    url: '/reference',
    views: {
      'menuContent': {
        templateUrl: 'app/settings/reference.html',
      }
    }
  })
  .state('app.friends', {
      url: '/profile/:id/friends',
      views: {
        'menuContent': {
          templateUrl: 'app/friends/friends.html',
          controller: 'Friends',
          controllerAs: 'vm'
        }
      }
    })
    .state('app.dreams', {
      url: '/dreams',
      views: {
        'menuContent': {
          templateUrl: 'app/dreamlist/dreams.html',
          controller: 'DreamList',
          controllerAs: 'vm'
        }
      }
    })
  .state('app.dream', {
    url: '/dreams/:id',
    views: {
      'menuContent': {
        templateUrl: 'app/dreamshow/dream.html',
        controller: 'DreamShow',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.create',{
    url: '/new',
    views: {
      'menuContent': {
        templateUrl: 'app/CRUD/create.html',
        controller: 'DreamCreate',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.edit',{
    url: '/dreams/:id/edit',
    views: {
      'menuContent': {
        templateUrl: 'app/CRUD/update.html',
        controller: 'DreamUpdate',
        controllerAs: 'vm'
      }
    }
  })
  .state('app.search',{
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'app/dreamlist/search.html',
        controller: 'DreamList',
        controllerAs: 'vm'
      }
    }
  });
  
 $urlRouterProvider.otherwise('/app/dreams');

});
})();