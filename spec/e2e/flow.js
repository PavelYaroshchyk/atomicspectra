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

		beforeEach(function(){
			browser.get('/#lines');
			var aluminiumBtn = element(by.buttonText('Al'));
			aluminiumBtn.click();

			var goBtn = element(by.buttonText('go'));
			goBtn.click();
		})

		it('should produce a table with Al lines', function(){
			expect(linesTable.isPresent()).toBeTruthy();
		});
	})
});
