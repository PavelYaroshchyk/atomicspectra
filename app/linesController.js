angular.module('spectralPlotter')
	.controller('LinesController',['$scope', '$http', function($scope, $http){
		//--junk 
		$scope.testData = {};
		$scope.testData.testClick = function(item, event){
			var testUrl = 'http://localhost:8080/atomicspectroscopy/api/data/lines/H/I';
			var testResponse = $http.get(testUrl);	
			testResponse.success(function(data, status, headers, config){
				$scope.testData.result = data;
				console.log(data);
			});
			testResponse.error(function(data, status, headers, config){
				alert('failed call');
			});
		}
		//-junk
	}]);
