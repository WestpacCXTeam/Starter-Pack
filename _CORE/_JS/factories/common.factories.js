/**
 * Created by seankerr on 25/11/2014.
 */


(function (module) {

	/* return a mock json file
	* */
	module.factory("SimpleService", ["$http", "$q", function($http, $q){

		var service = {
			getData: function(){
				var deferred = $q.defer();

				$http.get("../_Mock/mock.json").success(function(data){

					deferred.resolve(data);

				});
				return deferred.promise;
			}

		};

		return service;
	}])

	//lets connect to twitter

	.factory("TwitterAPI", function($resource) {
		return $resource("http://search.twitter.com/search.json",
				{ callback: "JSON_CALLBACK" },
				{ get: { method: "JSONP" }});
	});

}(angular.module('common.factories', ['common.controllers'])));

