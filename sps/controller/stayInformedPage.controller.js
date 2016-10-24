// when the back button is pressed, person returns to main page
sap.ui.controller("sps.controller.stayInformedPage", {
    goHome: function() {
        app.back();
    },
	// Go to WebPage 1
	toFirstWebPage: function() {
		sap.m.URLHelper.redirect("http://www.sprc.org/", false);
	},
	// Go to Web Page 2
	toSecondWebPage: function() {
		sap.m.URLHelper.redirect("http://www.suicidepreventionlifeline.org/", false);
	}
});
