sap.ui.controller("sps.controller.treePage", {

    onInit: function() {
        // create JSON model to manage data
        var oModel = new sap.ui.model.json.JSONModel();
        // load data from JSOM file, for use by the model
        oModel.loadData("sps/questions.json");
        sap.ui.getCore().setModel(oModel);

        // set the text property of the Question to "q1", when page is first loaded
        this.getView().byId("quest").bindText("/Questions/q1");
    },

    // return to main page
    goHome: function() {
        app.back();
    },

    /* these two methods are temporary and need to be replaced with
     * the final code later on
     */
    respondYes : function() {
        questionCounter++;
        responseCounter++;
        switch(questionCounter) {
            case 2:
                this.getView().byId("quest").bindText("/Questions/q2");
                break;
            case 3:
                this.getView().byId("quest").bindText("/Questions/q3");
                break;
            case 4:
                this.getView().byId("quest").bindText("/Questions/q4");
                break;
            default:
                this.getView().byId("quest").bindText("/Questions/q1");
                break;
        }
        console.log("questionCounter = " + questionCounter);

    },
    respondNo : function() {
        app.to(responsePage);
    }
});
