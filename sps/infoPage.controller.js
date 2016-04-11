//The go back button on menu bar
sap.ui.controller("sps.infoPage", {
    goHome: function() {
		sap.m.MessageToast.show("Home", {width: "7em"});
        app.back();
    }
});
