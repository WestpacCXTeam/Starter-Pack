

(function (module) {
    //initial controller
    module.controller('MainCtrl', ['$scope', '$rootScope', '$window',
        function ($scope, $rootScope, $window) {

        $scope.message = "this is a message from the $scope of the first controller";

        }
    ])

}(angular.module('common.controllers',[])));