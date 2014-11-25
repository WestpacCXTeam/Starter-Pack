

describe('Unit testing for state', function() {
	var $compile,
		$rootScope;

	// add the dependencies
	beforeEach(module('starter','stateMock'));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($state) {
	state = $state;
	}));

	it("expect state to be defined", function() {
		expect(state).toBeDefined();
	});

});
