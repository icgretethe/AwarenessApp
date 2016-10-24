sap.ui.controller("sps.controller.treePage", {
    onInit: function() {
        // use this to keep track of which question/response should be displayed
        questionCounter = 1;
        // create JSON model to manage data
        oModel = new sap.ui.model.json.JSONModel();
        // load data from JSOM file, for use by the model
        oModel.loadData("sps/data.json");
        sap.ui.getCore().setModel(oModel);

        // set the text property of the Question to the first question,
        // when page is first loaded
        this.getView().byId("quest").bindText("/Questions/0");

		// set "Yes" and "No" Buttons to Visible and Home button hidden
		this.getView().byId("yButton").setVisible(true);
		this.getView().byId("nButton").setVisible(true);
		this.getView().byId("homeButton").setVisible(false);
    },

    // Return to main page
    goHome: function() {
		questionCounter = 1;
        app.back();

		// This returns the question back to question 1, and also
		// Sets the yes/no buttons to visible and Home button to hidden
		this.getView().byId("quest").bindText("/Questions/0");
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
                this.getView().byId("quest").bindText("/Questions/1");
                questionCounter++;
                break;
            case 2:
                this.getView().byId("quest").bindText("/Questions/2");
                questionCounter++;
                break;
            case 3:
                this.getView().byId("quest").bindText("/Questions/3");
                questionCounter++;
                break;
            default:
                // there are no more questions, so display a message
                this.getView().byId("quest").bindText("/Error/0");

				this.getView().byId("yButton").setVisible(false);
				this.getView().byId("nButton").setVisible(false);
				this.getView().byId("homeButton").setVisible(true);
                break;
        }
    },
    /**
     * Display a response based on the question number
     */
    respondNo : function() {

		// set Yes/No Buttons to Hidden and Home button Visible
		this.getView().byId("yButton").setVisible(false);
		this.getView().byId("nButton").setVisible(false);
		this.getView().byId("homeButton").setVisible(true);
		switch(questionCounter) {
            case 1:
                this.getView().byId("quest").bindText("/Responses/0");
                break;
            case 2:
                this.getView().byId("quest").bindText("/Responses/1");
                break;
            case 3:
                this.getView().byId("quest").bindText("/Responses/2");
                break;
            case 4:
                this.getView().byId("quest").bindText("/Responses/3");
                break;
            default:
                /* This response is displayed if there are no more responses
                 * are available. This should not be reachable */
                this.getView().byId("quest").bindText("/Error/1");
                break;
        }
    }
});
