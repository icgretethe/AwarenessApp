sap.ui.controller("sps.treePage", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf sps.sps
*/
  currentNode : 0,
  nodeChoice : 0,
  onInit: function() {
      var oModel = new sap.ui.model.json.JSONModel();
      oModel.loadData("sps/questions.json");
	  sap.ui.getCore().setModel(oModel);
  },
  goHome: function() {
        app.back();
  },
  getCurrentNode : function() {
	  return currentNode;
  },
  Button1 : function() {
	  nodeChoice = 1;
	  masterFunction();
	  //sap.ui.getCore().refresh()
  },
  Button2 : function() {
	  nodeChoice = 2;
	  masterFunction();
  },
  masterFunction : function() {
	  if (currentNode == 0) {
		  //this should'nt happen
	  }
	  if (currentNode == 1){

	  }
	  if (currentNode == 2){

	  }
	  if (currentNode == 3){

	  }
	  if (currentNode == 4){

	  }
  },


/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf sps.sps
*/
//  onBeforeRendering: function() {
//
//  },

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf sps.sps
*/
/*
onAfterRendering: function() {
	  if (currentNode == 0) {
		  //this should'nt happen
		  alert("Test");
	  }
	  if (currentNode == 1){

	  }
	  if (currentNode == 2){
		  app.to(treePage);
	  }
	  if (currentNode == 3){

	  }
	  if (currentNode == 4){

	  }
}
*/
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf sps.sps
*/
//  onExit: function() {
//
//  }

});
