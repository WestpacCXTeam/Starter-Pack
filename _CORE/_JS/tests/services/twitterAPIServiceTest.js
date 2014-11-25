describe('MyCtrl', function(){
	var scope, ctrl, httpBackend;

	beforeEach(module('stater','stateMock'));

	beforeEach(
			inject(
					function($controller, $rootScope, TwitterAPI, $httpBackend, $state) {
						state = $state;
						httpBackend = $httpBackend;
						scope = $rootScope.$new();
						ctrl = $controller("TwitterAPI", {
							$scope: scope, TwitterAPI: TwitterAPI });

						var mockData = { key: "test" };
						var url = "http://search.twitter.com/search.json?" +
								"callback=JSON_CALLBACK&q=angularjs";
						httpBackend.whenJSONP(url).respond(mockData);
					}
			)

	);

	it('should set searchResult on successful search', function() {
		scope.searchTerm = "angularjs";
		scope.search();
		httpBackend.flush();

		expect(scope.searchResult.key).toBe("test");
	});


});
