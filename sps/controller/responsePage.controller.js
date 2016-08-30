sap.ui.controller("sps.controller.responsePage", {

    onInit: function() {

        // create JSON model to manage data
        //var oModel = new sap.ui.model.json.JSONModel();
        // load data from JSOM file, for use by the model
        //oModel.loadData("sps/responses.json");
        //sap.ui.getCore().setModel(oMdl);
        switch(responseCounter) {
            case 1:
                this.getView().byId("resp").bindText("/Responses/r1");
                break;
            case 2:
                this.getView().byId("resp").bindText("/Responses/r2");
                break;
            case 3:
                this.getView().byId("resp").bindText("/Responses/r3");
                break;
            case 4:
                this.getView().byId("resp").bindText("/Responses/r4");
                break;
            default:
                this.getView().byId("resp").bindText("/Error/errR");
                break;
        }
    },

    // return to main page
    goHome: function() {
        questionCounter = 1;
        responseCounter = 1;
        app.to(mainPage);
    }

});
