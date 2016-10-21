// when the back button is pressed, person returns to main page
sap.ui.controller("sps.controller.infoPage", {

	onInit: function() {
		// create JSON model to manage data
		//JSON model was created in treePage, edit future
		var contactList = this.getView().byId("list");
		contactList.bindItems({
			path: "/Contacts",
			template: new sap.m.ObjectListItem({
				type: "Active",
				tap: function() {
				/////////////////////////////////////////
				//sap.m.URLHelper.triggerTel("{phone}")//
				/////////////////////////////////////////
				sap.m.URLHelper.triggerTel("*tel:6186505500");
				},
				attributes: [new sap.m.ObjectAttribute({
				text: "{text}",
				})]
			})
		})
	},
    goHome: function() {
        app.back();
    }
});
