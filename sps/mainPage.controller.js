sap.ui.controller("sps.mainPage", {
    // go to the Decision Tree Page
    goToTree: function() {
        app.to(treePage);
    },
    // go to Info Page
    toInfoPage: function() {
        app.to(infoPage);
    },
    // leave the app and go to the Patient Care Report
    toCareReport: function() {
        sap.m.URLHelper.redirect("https://publicdocs.maxient.com/reportingform.php?SIUEdwardsville&layout_id=2", false);
    }
});
