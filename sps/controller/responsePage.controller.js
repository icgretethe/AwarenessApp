sap.ui.controller("sps.controller.responsePage", {

    onInit: function() {
        // create JSON model to manage data
        var oModel = new sap.ui.model.json.JSONModel();
        // load data from JSOM file, for use by the model
        oModel.loadData("sps/responses.json");
        sap.ui.getCore().setModel(oModel);

        switch(responseCounter) {
            case 1:
                this.getView().byId("resp").bindText("/Responses/r1");
                break;
            case 2:
                this.getView().byId("resp").bindText("/Responses/r2");
                break;
            default:
                // this.getView().byId("resp").bindText("/Responses/r1");
                break;
        }
    },

    // return to main page
    goHome: function() {
        app.back();
    }

});
