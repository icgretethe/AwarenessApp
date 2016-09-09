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
		questionCounter = 1;
		responseCounter = 1;
        app.back();
		//This returns the question back to question 1, but looks ugly
		this.getView().byId("quest").bindText("/Questions/q1");
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
    },
	/*This can potentially replace the response Page. It isn't finished but
	  if we are only displaying an answering, it might be easier and cleaner.
	  */
    respondNo : function() {
		switch(responseCounter) {
            case 1:
                this.getView().byId("quest").bindText("/Responses/r1");
                break;
            case 2:
                this.getView().byId("quest").bindText("/Responses/r2");
                break;
            case 3:
                this.getView().byId("quest").bindText("/Responses/r3");
                break;
            case 4:
                this.getView().byId("quest").bindText("/Responses/r4");
                break;
            default:
                this.getView().byId("quest").bindText("/Error/errR");
                break;
        }		
    }
});
