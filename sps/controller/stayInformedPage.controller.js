// when the back button is pressed, person returns to main page
sap.ui.controller("sps.controller.stayInformedPage", {
    goHome: function() {
        app.back();
    },
	// Go to WebPage 1
	toSprcPage: function() {
		sap.m.URLHelper.redirect("http://www.sprc.org/", false);
	},
	// Go to Web Page 2
	toNsphPage: function() {
		sap.m.URLHelper.redirect("http://www.suicidepreventionlifeline.org/", false);
	},

    toCpnpPage: function() {
        sap.m.URLHelper.redirect("https://siue.collegiatelink.net/organization/cpnpsiue", false);
    },

    toMissaPage: function() {
        sap.m.URLHelper.redirect("https://siue.collegiatelink.net/organization/missa", false);
    },

    toAmPage: function() {
        sap.m.URLHelper.redirect("https://siue.collegiatelink.net/organization/actminds", false);
    }

});
