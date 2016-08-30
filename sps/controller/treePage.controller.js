sap.ui.controller("sps.controller.treePage", {
    onInit: function() {
        responseCounter = 1;
        // create JSON model to manage data
        //var oModel = new sap.ui.model.json.JSONModel();
        oModel = new sap.ui.model.json.JSONModel();
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
        // update question and response counters
        switch(questionCounter) {
            case 1:
                this.getView().byId("quest").bindText("/Questions/q2");
                questionCounter++;
                responseCounter++;
                break;
            case 2:
                this.getView().byId("quest").bindText("/Questions/q3");
                questionCounter++;
                responseCounter++;
                break;
            case 3:
                this.getView().byId("quest").bindText("/Questions/q4");
                questionCounter++;
                responseCounter++;
                break;
            default:
                // there are no more questions, so display a message
                this.getView().byId("quest").bindText("/Error/errQ");
                break;
        }
        // we need to know the counters for debugging purposes
        console.log("questionCounter = " + questionCounter);
        console.log("responseCounter = " + responseCounter);
    },
    respondNo : function() {
        //questionCounter = 1;
        responseCounter++;
        app.to(responsePage);
    }
});
