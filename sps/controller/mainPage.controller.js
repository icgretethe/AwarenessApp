sap.ui.controller("sps.controller.mainPage", {
    /**
     * this prevents an error that causes the question and response counters
     * to remain the same if someone leaves the decision tree, goes to the
     * mainPage and then goes back to the decision tree
     */
    // Go to the Decision Tree Page
    goToTree: function() {
        app.to(treePage);
    },
    // Go to Info Page
    toInfoPage: function() {
        app.to(infoPage);
    },
    // leave the app and go to the Patient Care Report
    toCareReport: function() {
        sap.m.URLHelper.redirect("https://publicdocs.maxient.com/reportingform.php?SIUEdwardsville&layout_id=2", false);
    },
	//Go To Educate yourself Page
	toEducateYourselfPage: function() {
		app.to(educateYourselfPage);
	},
	// Go to the Stay Informed Age
	toStayInformedPage: function() {
		app.to(stayInformedPage);
	}
});
