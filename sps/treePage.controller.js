sap.ui.controller("sps.treePage", {

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
        // change the question to Question #2
        this.getView().byId("quest").bindText("/Questions/q2");
    },
    respondNo : function() {
        this.getView().byId("quest").bindText("/Questions/q3");
    }
});
