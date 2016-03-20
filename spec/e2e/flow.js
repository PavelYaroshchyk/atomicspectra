describe('given arrived at landed page', function(){
	describe('when the button to proceed to lines is pushed', function(){
		var homeView = element(by.css('#apphome'));
		var linesFormView = element(by.css('#lines'));

		beforeEach(function(){
			browser.get('/index.html');
			expect(homeView.isPresent()).toBeTruthy();
			expect(linesFormView.isPresent()).toBeFalsy();
			//appears as a button but actually a link style as button by bootstrap
			var linkToLines = element(by.linkText('proceed to lines'));
			linkToLines.click();
		});

		it('should switch to lines form', function(){
			expect(linesFormView.isPresent()).toBeTruthy();
		});

		it('should not display home view', function(){
			expect(homeView.isPresent()).toBeFalsy();
		});
	});
});

describe('given arrived at lines page', function(){
	describe('when the Al button is pressed', function(){
		var linesTable = element(by.css('#lines-table'));
		var linesChart = element(by.css('#lines-chart'));

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumBtn = element(by.buttonText('Al'));
			aluminiumBtn.click();

			var goBtn = element(by.buttonText('go'));
			goBtn.click();
		})

		it('should produce a table with Al lines', function(){
			
			expect(linesTable.isPresent()).toBeTruthy();
			var row = element.all(by.repeater('line in linesData.result')).first();
			var cells = row.all(by.tagName('td'));
			var cellTexts = cells.map(function (e) {
    			return e.getText();
			});

			expect(cellTexts).toContain('Al');
			expect(cellTexts).toEqual(['Al', 'I', '211.8312', 'g,a', '10300000', '0', '47192.38', '2', '4']);
		});


		it ('should produce a line chart', function(){
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

			var goBtn = element(by.buttonText('go'));
			goBtn.click();
		});

		it('should produce a table with lines', function(){
				expect(linesTable.isPresent()).toBeTruthy();
			});

			it ('should produce a line chart', function(){
				expect(linesChart.isPresent()).toBeTruthy();
			});
	});
});
