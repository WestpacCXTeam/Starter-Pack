describe('Unit testing for service returning a promise', function() {
	var $rootScope;

	// add the dependencies
	beforeEach(module('starter','stateMock','common.factories'));


	// Initialize the controller and a mock scope
	beforeEach(inject(function ($state,SimpleService,_$httpBackend_) {
		service = SimpleService;
		state = $state;
		$httpBackend = _$httpBackend_;
	}));

	it("should resolve to an array of stuff", function () {
		$httpBackend.whenGET("../_mock/mock.json")
		.respond([{
					yo: "yo",
					yo: "yo",
					yo: "yo"
		}]);
		var promise = service.getData(), theYos;

		promise.then(function (yos) {
			theYos = yos;
		});
		$httpBackend.flush();
		expect(theYos instanceof Array).toBeTruthy();
	});
});
