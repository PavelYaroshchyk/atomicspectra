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
			var dataUrl = serviceUrl + $scope.linesData.element + '/I';
			var linesResponse = $http.get(dataUrl);

			linesResponse.success(function(data, status, headers, config){
				$scope.linesData.result = data;


				//charts not using directive from here
				google.charts.load('current', {'packages':['corechart']});
		      	google.charts.setOnLoadCallback(drawChart);

		      	function drawChart() {
		        	var data = google.visualization.arrayToDataTable([
		          	['Wavelength', 'spectrum 1', 'spectrum 2'],
		          	['label 1',  1,      2],
		          	['label 2',  5,      1],
		          	['label 3',  1,       10],
		          	['label 4',  10,      1],
		          	['label 5',  1,      1]
		        	]);

		        	var options = {
		          	title: 'Company Performance',
		          	curveType: 'function',
		          	legend: { position: 'bottom' }
		        	};

		        	var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
		        	chart.draw(data, options);
		      	}
				//till here



				//using a directive from here
				var chart1 = {};
			    chart1.type = "LineChart";
			    chart1.cssStyle = "height:200px; width:300px;";
			    chart1.data = {"cols": [
			        {id: "month", label: "Month", type: "string"},
			        {id: "laptop-id", label: "Laptop", type: "number"},
			        {id: "desktop-id", label: "Desktop", type: "number"},
			        {id: "server-id", label: "Server", type: "number"},
			        {id: "cost-id", label: "Shipping", type: "number"}
			    ], "rows": [
			        {c: [
			            {v: "January"},
			            {v: 19, f: "42 items"},
			            {v: 12, f: "Ony 12 items"},
			            {v: 7, f: "7 servers"},
			            {v: 4}
			        ]},
			        {c: [
			            {v: "February"},
			            {v: 13},
			            {v: 1, f: "1 unit (Out of stock this month)"},
			            {v: 12},
			            {v: 2}
			        ]},
			        {c: [
			            {v: "March"},
			            {v: 24},
			            {v: 0},
			            {v: 11},
			            {v: 6}

			        ]}
			    ]};

			    chart1.options = {
			        "title": "Sales per month",
			        "isStacked": "true",
			        "fill": 20,
			        "displayExactValues": true,
			        "vAxis": {
			            "title": "Sales unit", "gridlines": {"count": 6}
			        },
			        "hAxis": {
			            "title": "Date"
			        }
			    };

			    chart1.formatters = {};
			    $scope.chart1 = chart1;

				//till here


			});
			linesResponse.error(function(data, status, headers, config){
				console.log('failed get lines request' + status);
			});
		}

	}]);
