describe('starter.friends', function(){
  var scope, controller, Restangular, stateParams, httpBackend;

  beforeEach(module('starter.friends'));
  beforeEach(module('restangular'));
  beforeEach(module('ui.router'));

  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, $stateParams, _Restangular_){
    Restangular = _Restangular_;
    httpBackend = _$httpBackend_;
    stateParams = {id: 1};
    scope = $rootScope.$new();

    httpBackend.whenGET("http://localhost:3000/users").respond(users);
    

    controller = $controller('Friends', {
      $scope: scope,
      $httpBackend: httpBackend,
      Restangular: Restangular,
      $stateParams: stateParams
    });
  }));
  afterEach(function () {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should be defined', function () {
    expect(scope).toBeDefined();
  });

  it('should get friend')

});