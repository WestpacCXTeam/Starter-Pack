describe('Unit testing for service', function() {
	var $rootScope;

	// add the dependencies
	beforeEach(module('starter','stateMock','common.factories'));


	// Initialize the controller and a mock scope
	beforeEach(inject(function ($state,SimpleService,_$httpBackend_) {
		service = SimpleService;
		state = $state;
		$httpBackend = _$httpBackend_;
	}));

	it("should make an faux ajax call to the service and return crap", function () {
		$httpBackend.whenGET("../_Mock/mock.json").respond([{
			"user": "testUser",
			"action": "testAction",
			"object": {}
		}]);
		expect(service.getData()).toBeDefined();
	});

});
