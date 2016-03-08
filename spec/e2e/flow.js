describe('given arrived at landed page', function(){
	describe('when the link to proceed to lines is pushed', function(){
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
