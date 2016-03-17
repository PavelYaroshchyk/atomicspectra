var constants = {minWl: 200, maxWl: 1000, pixSize: 0.1, numPix: 100};

var getEmptySpec = function(){
	var spectrum = [];
	var curWl = constants.minWl;
	var i = 0;
	while (curWl < constants.maxWl){
		spectrum.push({wl: curWl, inten: Math.random()});
		curWl += constants.pixSize;
		i++;
	}
	return spectrum;
}



var gauss = function(centWl, fwhm){
	var profile = [];

	centWl = findCentPix(centWl);
	
	var wlStart = centWl - constants.numPix * constants.pixSize/2;
	for (var i = 0; i < constants.numPix; i++){
		var curWl = wlStart + i * constants.pixSize;
		if (curWl >= constants.minWl && curWl <= constants.maxWl){
			var curInten = Math.exp(-Math.log(2) * Math.pow(((curWl - centWl)/fwhm/2), 2));
			profile.push({wl: curWl, inten: curInten});
		}
	}
	return profile;
}

var findCentPix = function(centWl){
	var wl = Math.floor(centWl);
	var dec = centWl - wl;
	for (var i = 0; i < 1; i += constants.pixSize){
		if (Math.abs(dec - i) < constants.pixSize ){
			dec = i;
			break;
		}
	}
	return wl + dec;
}

var junkLine = function(centWl, fwhm){
	var data = gauss(centWl, fwhm);
		var rows = [];
		angular.forEach(data, function(value, key){
			var column = {c: [{v: value.wl}, {v: value.inten, f: "label " + value.inten}]};
			rows.push(column);
		});
	return rows;
}

var junkLine2 = function(){
	var data = getEmptySpec();
		var rows = [];
		angular.forEach(data, function(value, key){
			var column = {c: [{v: value.wl}, {v: value.inten, f: "label " + value.inten}]};
			rows.push(column);
		});
	return rows;
}