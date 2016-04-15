// when the back button is pressed, person returns to main page
sap.ui.controller("sps.controller.infoPage", {
    goHome: function() {
        app.back();
    }
});
