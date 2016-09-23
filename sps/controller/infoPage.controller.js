// when the back button is pressed, person returns to main page
sap.ui.controller("sps.controller.infoPage", {
	onInit: function() {
        responseCounter = 1;
        // create JSON model to manage data
        //var oModel = new sap.ui.model.json.JSONModel();
        oModel = new sap.ui.model.json.JSONModel();
        // load data from JSOM file, for use by the model
        oModel.loadData("sps/imporantContacts.json");
        sap.ui.getCore().setModel(oModel);

        // set the text property of the Question to "q1", when page is first loaded
        this.getView().byId("quest").bindText("/Contacts/1");
    },
    goHome: function() {
        app.back();
    }
});
