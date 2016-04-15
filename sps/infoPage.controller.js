// when the back button is pressed, person returns to main page
sap.ui.controller("sps.infoPage", {
    goHome: function() {
        app.back();
    }
});
