describe('starter.dreamlist', function(){
    var $controller;

    beforeEach(module('starter.dreamlist'));

    beforeEach(inject(function($controller){
      DreamList = $controller('DreamList', {
        
      });
    }));

    it('should have get query', function(){
       
    });
});