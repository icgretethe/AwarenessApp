// when the back button is pressed, person returns to main page
sap.ui.controller("sps.controller.infoPage", {
	onInit: function() {
		responseCounter = 1;
		// create JSON model to manage data
		//var oModel = new sap.ui.model.json.JSONModel();
		oModel = new sap.ui.model.json.JSONModel();
		// load data from JSOM file, for use by the model
		oModel.loadData("sps/imporantContacts.json");
		sap.ui.getCore().setModel(oModel);

		var oTable1 = new sap.ui.table.Table({
			title : "Contacts"
		})
		oTable1.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Imporant Contacts"
			}),
			template : new sap.ui.commons.TextView({
				text: '{contact}'
			}),
			width : "10px"
		}));
		oTable1.placeAt('content');
	}),
		
    goHome: function() {
        app.back();
    }
});


oTable1.addColumn(new sap.ui.table.Column({  
   label : new sap.ui.commons.Label({  
      text : "Player Name"  
   }),  
   template : new sap.ui.commons.TextView({
      text: '{name}'
   }),
   width : "10px"  
}));