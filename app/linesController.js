angular.module('spectralPlotter')
.controller('LinesController',['$scope', '$http', '$q', '$anchorScroll', '$location', function($scope, $http, $q, $anchorScroll, $location){
	
	var production = false;
	var serviceUrl = production ? 'http://atomicspectra.com/atomicspectroscopy/api/data/lines/' : 'http://localhost:8080/atomicspectroscopy/api/data/lines/';


	$scope.linesData = {};
	$scope.linesData.error = {};
	$scope.linesData.warning = {};
	$scope.linesData.info = {};
	$scope.linesData.error.flag = false;
	$scope.linesData.warning.flag = false;
	$scope.linesData.info.flag=false;
	
	$scope.linesData.isH = false;
	$scope.linesData.isHe = false;
	$scope.linesData.isLi = false;
	$scope.linesData.isBe = false;
	$scope.linesData.isB = false;
	$scope.linesData.isC = false;
	$scope.linesData.isN = false;
	$scope.linesData.isO = false;
	$scope.linesData.isF = false;
	$scope.linesData.isNe = false;
	$scope.linesData.isNa = false;
	$scope.linesData.isMg = false;
	$scope.linesData.isAl = false;
	$scope.linesData.isSi = false;
	$scope.linesData.isP = false;
	$scope.linesData.isS = false;
	$scope.linesData.isCl = false;
	$scope.linesData.isAr = false;
	$scope.linesData.isK = false;
	$scope.linesData.isCa = false;
	$scope.linesData.isSc = false;
	$scope.linesData.isTi = false;
	$scope.linesData.isV = false;
	$scope.linesData.isCr = false;
	$scope.linesData.isMn = false;
	$scope.linesData.isFe = false;
	$scope.linesData.isCo = false;
	$scope.linesData.isNi = false;
	$scope.linesData.isCu = false;
	$scope.linesData.isGa = false;
	$scope.linesData.isGe = false;
	$scope.linesData.isKr = false;
	
	$scope.linesData.isGo = false;
	$scope.linesData.elements = [];
	$scope.linesData.fwhm = '0.2';
	$scope.linesData.numHorGr = 6;
	$scope.linesData.startWl = '200';
	$scope.linesData.endWl = '1000';

	var gatherElements = function(){

		$scope.linesData.elements.length = 0;
		
		if ($scope.linesData.isH &&  $scope.linesData.elements.indexOf('H') == -1)  $scope.linesData.elements.push('H');
		if ($scope.linesData.isHe && $scope.linesData.elements.indexOf('He') == -1) $scope.linesData.elements.push('He');
		if ($scope.linesData.isLi && $scope.linesData.elements.indexOf('Li') == -1) $scope.linesData.elements.push('Li');
		if ($scope.linesData.isBe && $scope.linesData.elements.indexOf('Be') == -1) $scope.linesData.elements.push('Be');
		if ($scope.linesData.isB && $scope.linesData.elements.indexOf('B') == -1) $scope.linesData.elements.push('B');
		if ($scope.linesData.isC && $scope.linesData.elements.indexOf('C') == -1) $scope.linesData.elements.push('C');
		if ($scope.linesData.isN && $scope.linesData.elements.indexOf('N') == -1) $scope.linesData.elements.push('N');
		if ($scope.linesData.isO && $scope.linesData.elements.indexOf('O') == -1) $scope.linesData.elements.push('O');
		if ($scope.linesData.isF && $scope.linesData.elements.indexOf('F') == -1) $scope.linesData.elements.push('F');
		if ($scope.linesData.isNe && $scope.linesData.elements.indexOf('Ne') == -1) $scope.linesData.elements.push('Ne');
		if ($scope.linesData.isNa && $scope.linesData.elements.indexOf('Na') == -1) $scope.linesData.elements.push('Na');
		if ($scope.linesData.isMg && $scope.linesData.elements.indexOf('Mg') == -1) $scope.linesData.elements.push('Mg');
		if ($scope.linesData.isAl && $scope.linesData.elements.indexOf('Al') == -1) $scope.linesData.elements.push('Al');
		if ($scope.linesData.isSi && $scope.linesData.elements.indexOf('Si') == -1) $scope.linesData.elements.push('Si');
		if ($scope.linesData.isP && $scope.linesData.elements.indexOf('P') == -1) $scope.linesData.elements.push('P');
		if ($scope.linesData.isS && $scope.linesData.elements.indexOf('S') == -1) $scope.linesData.elements.push('S');
		if ($scope.linesData.isCl && $scope.linesData.elements.indexOf('Cl') == -1) $scope.linesData.elements.push('Cl');
		if ($scope.linesData.isAr && $scope.linesData.elements.indexOf('Ar') == -1) $scope.linesData.elements.push('Ar');
		if ($scope.linesData.isK && $scope.linesData.elements.indexOf('K') == -1) $scope.linesData.elements.push('K');
		if ($scope.linesData.isCa && $scope.linesData.elements.indexOf('Ca') == -1) $scope.linesData.elements.push('Ca');	
		if ($scope.linesData.isSc && $scope.linesData.elements.indexOf('Sc') == -1) $scope.linesData.elements.push('Sc');	
		if ($scope.linesData.isTi && $scope.linesData.elements.indexOf('Ti') == -1) $scope.linesData.elements.push('Ti');	
		if ($scope.linesData.isV && $scope.linesData.elements.indexOf('V') == -1) $scope.linesData.elements.push('V');	
		if ($scope.linesData.isCr && $scope.linesData.elements.indexOf('Cr') == -1) $scope.linesData.elements.push('Cr');	
		if ($scope.linesData.isMn && $scope.linesData.elements.indexOf('Mn') == -1) $scope.linesData.elements.push('Mn');
		if ($scope.linesData.isFe && $scope.linesData.elements.indexOf('Fe') == -1) $scope.linesData.elements.push('Fe');
		if ($scope.linesData.isCo && $scope.linesData.elements.indexOf('Co') == -1) $scope.linesData.elements.push('Co');
		if ($scope.linesData.isNi && $scope.linesData.elements.indexOf('Ni') == -1) $scope.linesData.elements.push('Ni');
		if ($scope.linesData.isCu && $scope.linesData.elements.indexOf('Cu') == -1) $scope.linesData.elements.push('Cu');
		if ($scope.linesData.isGa && $scope.linesData.elements.indexOf('Ga') == -1) $scope.linesData.elements.push('Ga');	
		if ($scope.linesData.isGe && $scope.linesData.elements.indexOf('Ge') == -1) $scope.linesData.elements.push('Ge');
		if ($scope.linesData.isKr && $scope.linesData.elements.indexOf('Kr') == -1) $scope.linesData.elements.push('Kr');
	}


	$scope.linesData.fetchLines = function(item, event){
		$scope.linesData.error.flag=false;
		$scope.linesData.warning.flag=false;

		if (isNaN($scope.linesData.startWl) || isNaN($scope.linesData.endWl) || isNaN($scope.linesData.fwhm)){
			$scope.linesData.warning.flag = true;

			if (isNaN($scope.linesData.startWl)){
				$scope.linesData.warning.info = 'Start wavelength must be a number!';
			} else if (isNaN($scope.linesData.endWl)){
				$scope.linesData.warning.info = 'End wavelength must be a number!';
			} else {
				$scope.linesData.warning.info = 'FWHM must be a number!';
			}

		} else if (parseFloat($scope.linesData.startWl) >= parseFloat($scope.linesData.endWl)){
			$scope.linesData.warning.flag = true;
			$scope.linesData.warning.info = 'End wavelength must be greater than start wavelength!';

		} else if (parseFloat($scope.linesData.startWl) < 200){
			$scope.linesData.warning.flag = true;
			$scope.linesData.warning.info = 'Start wavelength must be greater than 200 nm!';

		} else if (parseFloat($scope.linesData.endWl) > 1000){
			$scope.linesData.warning.flag = true;
			$scope.linesData.warning.info = 'End wavelength must be less than 1000 nm!';

		} else if (parseFloat($scope.linesData.fwhm) <= 0){
			$scope.linesData.warning.flag = true;
			$scope.linesData.warning.info = 'FWHM must be a positive number!';
		} else {

			gatherElements();
			
			$scope.linesData.info.flag=true;
			$scope.linesData.info.text = $scope.linesData.elements.length > 3 ? 'Loading data. Please consider selecting fewer elements to speed up the process.' : 'Loading data.'; 

			var linesResponses = [];

			for (var i = 0; i < $scope.linesData.elements.length; i++){
				var dataUrl = serviceUrl + $scope.linesData.elements[i] + '?wlFrom=' + $scope.linesData.startWl + '&wlTo=' + $scope.linesData.endWl;	
				linesResponses[i] = $http.get(dataUrl, {cache: true});
			}

			$q.all(linesResponses).then(function(values) {

				var data = [];
				angular.forEach(values, function(value, key){
					data = data.concat(value.data);
				});
				$scope.linesData.result = data;

				var chart1 = {};
			    chart1.type = "LineChart";
			    chart1.cssStyle = "height:500px;";
			    chart1.data = {"cols": [
			        {id: "spec", label: "Spectrum", type: "number"},
			        {id: "aSpec", label: $scope.linesData.elements.join(', '), type: "number"}], 
			        "rows": getFormattedSpectrum(data, $scope.linesData.fwhm, $scope.linesData.startWl, $scope.linesData.endWl)
				};

			    chart1.options = {

			    	explorer: {
	    				//maxZoomIn:0.1,
	    				keepInBounds: true,
	    				actions: ['dragToZoom', 'rightClickToReset'] 
					},

					chartArea : { left: '10%', top: '10%', width: '90%', height: '80%' },

					//legend: { position: 'bottom' },
					legend: 'none',
					series: { 0: { color: '#000' }},

			  
			        "displayExactValues": true,
			        "vAxis": {
			            "title": "Intensity/a.u."
			             /*,titleTextStyle: {
            				color: '#FF851B',
            				bold: true
          				},*/
			        },
			        "hAxis": {
			            "title": "Wavelength/nm"
			             /*,titleTextStyle: {
            				color: '#FF851B',
            				bold: true
          				},*/
			        }
			    };

			    chart1.formatters = {};
			    $scope.linesData.linesChart = chart1;	
			    $scope.linesData.info.flag=false;
			}, function (reason){
				var str = JSON.stringify(reason, null, 4);
				console.log('request failed: ' + str);
				console.log('HTTP error code: ' + reason.status);
				$scope.linesData.error.flag=true;
				$scope.linesData.error.status=reason.status;
				$scope.linesData.error.statusText=reason.statusText;
				$scope.linesData.info.flag=false;
			});

		}

		
	}

	$scope.linesData.gotoAnchor = function(x) {
	 	var oldHash = $location.hash();
	 	$location.hash(x);
	 	$anchorScroll.yOffset = 50;
	 	$anchorScroll();
	 	$location.hash(oldHash);
	};
}])

.directive('setClassWhenAtTop', ['$window', function($window) {
    var $win = angular.element($window); // wrap window object as jQuery object

    return {
        restrict: 'A',
        link: function (scope, element, attrs)
        {
            var topClass = attrs.setClassWhenAtTop, // get CSS class from directive's attribute value
                topPadding = parseInt(attrs.paddingWhenAtTop, 10),
                offsetTop = element.prop('offsetTop'); // get element's offset top relative to document

            $win.on('scroll', function (e) {
                if ($window.pageYOffset + topPadding >= offsetTop) {
                    element.addClass(topClass);
                } else {
                    element.removeClass(topClass);
                }
            });
        }
    };
}]);
