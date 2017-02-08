sap.ui.controller("sps.controller.warnPage", {
    onInit: function() {
        // create JSON model to manage data
        oModel = new sap.ui.model.json.JSONModel();
        // load data from JSOM file, for use by the model
        oModel.loadData("sps/data.json");
        sap.ui.getCore().setModel(oModel);

/* ----- Warning Signs ----- */
// Talk
this.getView().byId("talkHeader").bindText("/Warnings/Talk/0");
this.getView().byId("talkList").bindText("/Warnings/Talk/1");
// Behavior
this.getView().byId("behaviorHeader").bindText("/Warnings/Behavior/0");
this.getView().byId("behaviorList").bindText("/Warnings/Behavior/1");
//Mood
this.getView().byId("moodHeader").bindText("/Warnings/Mood/0");
this.getView().byId("moodList").bindText("/Warnings/Mood/1");
/* ----- END Warning Signs ----- */

/*
        var warnList = this.getView().byId("talkList");
        warnList.bindItems({
            path: "/Warnings/Talk",
            template: new sap.m.Text({
                text: "/"
            })
    })
*/
    },
    // Return to main page
    goHome: function() {
        app.back();
    }
});
