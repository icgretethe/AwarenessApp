sap.ui.controller("sps.treePage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sps.sps
*/
  onInit: function() {
    var oModel = new sap.ui.model.json.JSONModel();
    oModel.loadData("sps/questions.json");
    sap.ui.getCore().setModel(oModel);
    //set the text property of the "quest" to "q1"
    this.getView().byId("quest").bindText("/Questions/q1");
  },
  goHome: function() {
    app.back();
  },
  respondYes : function() {
    // change the question to Question #2
    this.getView().byId("quest").bindText("/Questions/q2");
  },
  respondNo : function() {
    this.getView().byId("quest").bindText("/Questions/q3");
  }


/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sps.sps
*/
/*
 onBeforeRendering: function() {

  }
*/
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sps.sps
*/

/*
onAfterRendering: function() {

}
*/

//  onAfterRendering: function() {
//
//  },


/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sps.sps
*/
//  onExit: function() {
//
//  }

});
