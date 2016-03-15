angular.module('spectralPlotter')
	.controller('LinesController',['$scope', '$http', function($scope, $http){
	
		$scope.linesData = {};
		$scope.linesData.isAl = false;
		$scope.linesData.isGo = false;
		$scope.linesData.element = '';
		$scope.linesData.selectAl = function(){
			//$scope.linesData.element = 'Al';
			$scope.linesData.isAl = !$scope.linesData.isAl;
			$scope.linesData.element = $scope.linesData.isAl == true ? 'Al' : false;
			$scope.linesData.isGo = $scope.linesData.isAl;
		}

		$scope.linesData.fetchLines = function(item, event){
			var serviceUrl = 'http://localhost:8080/atomicspectroscopy/api/data/lines/';
			var dataUrl = serviceUrl + $scope.linesData.element;
			var linesResponse = $http.get(dataUrl);

			console.log('gauss = ' + gauss());


			linesResponse.success(function(data, status, headers, config){
				$scope.linesData.result = data;

				//using a directive from here
				var chart1 = {};
			    chart1.type = "LineChart";
			    chart1.cssStyle = "height:400px;";
			    chart1.data = {"cols": [
			        {id: "spec", label: "Spectrum", type: "number"},
			        {id: "aSpec", label: "Al", type: "number"},
			  
			    ], "rows": formatRows(data)

			    /*"rows": [
			        {c: [
			            {v: 200},
			            {v: 19, f: "label for 200 nm Al line"}
			           
			        ]},
			        {c: [
			        	{v: 300},
			            {v: 10, f: "label for 300 nm Al line"}
			            
			        ]},
			        {c: [
			            {v: 800},
			            {v: 2, f: "label for 800 nm Al line"}
			        ]}
			    ]*/};

			    chart1.options = {
			        "title": "Atomic Spectrum",
			        "isStacked": "true",
			        //"fill": 20,
			        "displayExactValues": true,
			        "vAxis": {
			            "title": "Intensity/a.u.", "gridlines": {"count": 6}
			        },
			        "hAxis": {
			            "title": "Wavelength/nm"
			        }
			    };

			    chart1.formatters = {};
			    $scope.linesData.linesChart = chart1;

				function formatRows(d){
					var rows = [];
					angular.forEach(d, function(value, key){

						if (!isNaN(value.relInt)){
							var column = {c: [{v: value.wl}, {v: value.relInt, f: "some label " + value.relInt}]};
							rows.push(column);
						} 
					})
			        return rows;
				}


			});
			linesResponse.error(function(data, status, headers, config){
				console.log('failed get lines request' + status);
			});
		}

	}]);
