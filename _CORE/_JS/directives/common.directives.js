/*

 PLEASE NOTE:

 Some of the functions contained in this file are for the purpose of prototyping only

 */

(function (module) {


	module.directive('aGreatEye', function () {
		return {
			restrict: 'E',
			replace: true,
			template: '<h1>lidless, wreathed in flame, {{1 + 1}} times</h1>'
		};
	});



}(angular.module('common.directives', ['common.controllers'])));

