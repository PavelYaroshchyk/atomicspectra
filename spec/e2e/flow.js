describe('given arrived at landed page', function(){
	describe('when the button to proceed to lines is pushed', function(){
		var homeView = element(by.css('#apphome'));
		var linesView = element(by.css('#periodic-table'));

		beforeEach(function(){
			browser.get('/index.html');
			expect(homeView.isPresent()).toBeTruthy();
			expect(linesView.isPresent()).toBeFalsy();
			//appears as a button but actually a link style as button by bootstrap
			var linkToLines = element(by.linkText('proceed to lines'));
			linkToLines.click();
		});

		it('should show periodic table', function(){
			expect(linesView.isPresent()).toBeTruthy();
		});

		it('should not display home view', function(){
			expect(homeView.isPresent()).toBeFalsy();
		});
	});
});

describe('given arrived at lines page', function(){
	describe('when the H button is pressed', function(){
		var linesTable = element(by.css('#lines-table'));
		var linesChart = element(by.css('#lines-chart'));

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumBtn = element(by.buttonText('H'));
			aluminiumBtn.click();

			var goBtn = element(by.buttonText('Go!'));
			goBtn.click();
		})

		it('should produce a table with H lines and a chart', function(){
			
			expect(linesTable.isPresent()).toBeTruthy();
			var row = element.all(by.repeater('line in linesData.result')).first();
			var cells = row.all(by.tagName('td'));
			var cellTexts = cells.map(function (e) {
    			return e.getText();
			});

			expect(cellTexts).toContain('H');
			expect(linesChart.isPresent()).toBeTruthy();
		});
	})
});

describe('given arrived at lines page', function(){
	describe('when the Al and Ca buttons are pressed', function(){
		var linesTable = element(by.css('#lines-table'));
		var linesChart = element(by.css('#lines-chart'));

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumButton = element(by.buttonText('Al'));
			var calciumButton = element(by.buttonText('Ca'));

			aluminiumButton.click();
			calciumButton.click();

			var goBtn = element(by.buttonText('Go!'));
			goBtn.click();
		});

		it('should produce a table with lines and a line chart', function(){
			expect(linesTable.isPresent()).toBeTruthy();
		});

		it ('should produce a line chart', function(){
			expect(linesChart.isPresent()).toBeTruthy();
		});
	});
});

describe('given arrived at lines page', function(){
	describe('and selecting a range of wavelength', function(){
		var linesTable = element(by.css('#lines-table'));
		var linesChart = element(by.css('#lines-chart'));

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumButton = element(by.buttonText('Al'));
			var calciumButton = element(by.buttonText('Ca'));
			var startWl = element(by.model('linesData.startWl'));
			var endWl = element(by.model('linesData.endWl'));
 			
 			startWl.clear().sendKeys('400');
 			endWl.clear().sendKeys('600');

			aluminiumButton.click();
			calciumButton.click();

			var goBtn = element(by.buttonText('Go!'));
			goBtn.click();
		});

		it('should produce a table with lines and a line chart', function(){
			expect(linesTable.isPresent()).toBeTruthy();
		});

		it ('should produce a line chart', function(){
			expect(linesChart.isPresent()).toBeTruthy();
		});
	});
});

describe('given arrived at lines page', function(){
	describe('and selecting wrong range of wavelength', function(){
		var linesTable = element(by.css('#lines-table'));
		var linesChart = element(by.css('#lines-chart'));
		var warningDiv = element(by.css('.alert-warning'));

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumButton = element(by.buttonText('Al'));
			var calciumButton = element(by.buttonText('Ca'));
			var startWl = element(by.model('linesData.startWl'));
			var endWl = element(by.model('linesData.endWl'));
 			
 			startWl.clear().sendKeys('40a');
 			endWl.clear().sendKeys('600');

			aluminiumButton.click();
			calciumButton.click();

			var goBtn = element(by.buttonText('Go!'));
			goBtn.click();
		});

		it('should NOT produce a table with lines and a line chart', function(){
			expect(linesTable.isPresent()).toBeTruthy();
		});

		it ('should NOT produce a line chart', function(){
			expect(linesChart.isPresent()).toBeTruthy();
		});

		it ('should produce a warning', function(){
			expect(warningDiv.isPresent()).toBeTruthy();
		});
	});
});

describe('given arrived at lines page', function(){
	describe('and selecting wrong range of wavelength', function(){
		var linesTable = element(by.css('#lines-table'));
		var linesChart = element(by.css('#lines-chart'));
		var warningDiv = element(by.css('.alert-warning'));

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumButton = element(by.buttonText('Al'));
			var calciumButton = element(by.buttonText('Ca'));
			var startWl = element(by.model('linesData.startWl'));
			var endWl = element(by.model('linesData.endWl'));
 			
 			startWl.clear().sendKeys('900');
 			endWl.clear().sendKeys('600');

			aluminiumButton.click();
			calciumButton.click();

			var goBtn = element(by.buttonText('Go!'));
			goBtn.click();
		});

		it('should NOT produce a table with lines and a line chart', function(){
			expect(linesTable.isPresent()).toBeTruthy();
		});

		it ('should NOT produce a line chart', function(){
			expect(linesChart.isPresent()).toBeTruthy();
		});

		it ('should produce a warning', function(){
			expect(warningDiv.isPresent()).toBeTruthy();
		});
	});
});

describe('given arrived at lines page', function(){
	describe('and selecting wrong range of wavelength', function(){
		var linesTable = element(by.css('#lines-table'));
		var linesChart = element(by.css('#lines-chart'));
		var warningDiv = element(by.css('.alert-warning'));

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumButton = element(by.buttonText('Al'));
			var calciumButton = element(by.buttonText('Ca'));
			var startWl = element(by.model('linesData.startWl'));
			var endWl = element(by.model('linesData.endWl'));
 			
 			startWl.clear().sendKeys('199');
 			endWl.clear().sendKeys('1000');

			aluminiumButton.click();
			calciumButton.click();

			var goBtn = element(by.buttonText('Go!'));
			goBtn.click();
		});

		it('should NOT produce a table with lines and a line chart', function(){
			expect(linesTable.isPresent()).toBeTruthy();
		});

		it ('should NOT produce a line chart', function(){
			expect(linesChart.isPresent()).toBeTruthy();
		});

		it ('should produce a warning', function(){
			expect(warningDiv.isPresent()).toBeTruthy();
		});
	});
});

describe('given arrived at lines page', function(){
	describe('and selecting wrong range of wavelength', function(){
		var linesTable = element(by.css('#lines-table'));
		var linesChart = element(by.css('#lines-chart'));
		var warningDiv = element(by.css('.alert-warning'));

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumButton = element(by.buttonText('Al'));
			var calciumButton = element(by.buttonText('Ca'));
			var startWl = element(by.model('linesData.startWl'));
			var endWl = element(by.model('linesData.endWl'));
 			
 			startWl.clear().sendKeys('200');
 			endWl.clear().sendKeys('1001');

			aluminiumButton.click();
			calciumButton.click();

			var goBtn = element(by.buttonText('Go!'));
			goBtn.click();
		});

		it('should NOT produce a table with lines and a line chart', function(){
			expect(linesTable.isPresent()).toBeTruthy();
		});

		it ('should NOT produce a line chart', function(){
			expect(linesChart.isPresent()).toBeTruthy();
		});

		it ('should produce a warning', function(){
			expect(warningDiv.isPresent()).toBeTruthy();
		});
	});
});

describe('given arrived at lines page', function(){
	describe('and selecting a range of wavelength', function(){
		var linesTable = element(by.css('#lines-table'));
		var linesChart = element(by.css('#lines-chart'));

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumButton = element(by.buttonText('Al'));
			var calciumButton = element(by.buttonText('Ca'));
			var startWl = element(by.model('linesData.startWl'));
			var endWl = element(by.model('linesData.endWl'));
			
 			
 			startWl.clear().sendKeys('400');
 			endWl.clear().sendKeys('600');

			aluminiumButton.click();
			calciumButton.click();

			var goBtn = element(by.buttonText('Go!'));
			goBtn.click();

		});

		it('once clicked sort by ionisation, it should produce a table with lines sorted by ionisation in asc order', function(){
			expect(linesTable.isPresent()).toBeTruthy();

			var sortByIonisation = element(by.buttonText('Ionisation'));
			sortByIonisation.click();

			var row = element.all(by.repeater('line in linesData.result')).first();
			var cells = row.all(by.tagName('td'));
			var cellTexts = cells.map(function (e) {
    			return e.getText();
			});
			expect(cellTexts).toEqual(['Al', 'I', '555.7063', '10', '230000', '25347.756', '43337.889', '2', '4']);


			//now sort in reverse order
			sortByIonisation.click();
			it('show sort a table by ionisation in reverse order', function(){
				row = element.all(by.repeater('line in linesData.result')).first();
				cells = row.all(by.tagName('td'));
				cellTexts = cells.map(function (e) {
    				return e.getText();
				});
				expect(cellTexts).toEqual(['Ca', 'II', '530.722', '70', '15000000','60611.28','79448.28','4','2']);
			});

		});
	});
});

describe('given arrived at lines page', function(){
	describe('and selecting a range of wavelength', function(){
		var linesTable = element(by.css('#lines-table'));
		var linesChart = element(by.css('#lines-chart'));

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumButton = element(by.buttonText('Al'));
			var calciumButton = element(by.buttonText('Ca'));
			var startWl = element(by.model('linesData.startWl'));
			var endWl = element(by.model('linesData.endWl'));
			
 			
 			startWl.clear().sendKeys('400');
 			endWl.clear().sendKeys('600');

			aluminiumButton.click();
			calciumButton.click();

			var goBtn = element(by.buttonText('Go!'));
			goBtn.click();

		});

		it('it should produce a table with lines sorted by wl in asc order by default', function(){
			expect(linesTable.isPresent()).toBeTruthy();

			var row = element.all(by.repeater('line in linesData.result')).first();
			var cells = row.all(by.tagName('td'));
			var cellTexts = cells.map(function (e) {
    			return e.getText();
			});
			expect(cellTexts).toEqual(['Al', 'II', '402.65', '20', '11600000', '110089.83', '134919.4', '5', '3']);


			//now sort in reverse order
			var sortByWl = element(by.buttonText('Wavelength/nm'));
			sortByWl.click();
			it('show sort a table by wl in reverse order', function(){
				row = element.all(by.repeater('line in linesData.result')).first();
				cells = row.all(by.tagName('td'));
				cellTexts = cells.map(function (e) {
    				return e.getText();
				});
				expect(cellTexts).toEqual(['Al', 'II', '599.975', '5', '2070000', '125703.14', '142365.54', '1', '3']);
			});

		});
	});
});


