describe('starter.friends', function(){
    var $controller;

    beforeEach(module('starter.friends'));

    beforeEach(inject(function($controller){
      Friends = $controller('Friends', {
        
      });
    }));

    it('should have get query', function(){
      expect(1) == 1;
    });
});