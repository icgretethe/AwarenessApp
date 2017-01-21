sap.ui.controller("sps.controller.warnPage", {
    onInit: function() {
        // create JSON model to manage data
        oModel = new sap.ui.model.json.JSONModel();
        // load data from JSOM file, for use by the model
        oModel.loadData("sps/data.json");
        sap.ui.getCore().setModel(oModel);
    },
    // Return to main page
    goHome: function() {
        app.back();
    }
});
