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
		
		//SetYes and No Buttons to Visible and Home button hidden
		this.getView().byId("yButton").setVisible(true);
		this.getView().byId("nButton").setVisible(true);
		this.getView().byId("homeButton").setVisible(false);
    },

    // return to main page
    goHome: function() {
		questionCounter = 1;
		responseCounter = 1;
        app.back();
		
		//This returns the question back to question 1, and also
		//Sets the yes/no buttons to visible and Home button to hidden
		this.getView().byId("quest").bindText("/Questions/q1");
		this.getView().byId("yButton").setVisible(true);
		this.getView().byId("nButton").setVisible(true);
		this.getView().byId("homeButton").setVisible(false);
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
				
				this.getView().byId("yButton").setVisible(false);
				this.getView().byId("nButton").setVisible(false);
				this.getView().byId("homeButton").setVisible(true);
                break;
        }
    },
	/*This can potentially replace the response Page. It isn't finished but
	  if we are only displaying an answering, it might be easier and cleaner.
	  */
    respondNo : function() {
    	
    	//Previous code
    	/*questionCounter = 1;
        responseCounter++;
        app.to(responsePage);*/
		
		//Set Yes/No Buttons to Hidden and Home button Visible
		this.getView().byId("yButton").setVisible(false);
		this.getView().byId("nButton").setVisible(false);
		this.getView().byId("homeButton").setVisible(true);
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
