
/*
 * Name: common.controllers
 *
 * Purpose: This controller is initialised on application load
 *
 * Dependencies:
 *
 * */

(function (module) {

	module.controller('MainCtrl', ['$scope', '$rootScope', '$window',
		function ($scope, $rootScope, $window) {

			//do some stuff inside the controller

		}
	])

	.controller("MyTwitterCTRL", function($scope, TwitterAPI) {
		$scope.search = function() {
			$scope.searchResult = TwitterAPI.get({ q: $scope.searchTerm });
		};
	});

}(angular.module('common.controllers',[])));