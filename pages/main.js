// SPS = Suicide Prevention Squad
sap.ui.getCore().attachInit(function () {
	var SPS = new sap.m.App("SPS", {
	    initialPage: "Main"
	});
    var Main = new sap.m.Page("Main", {
          title: "We're Here to Help"
                });

var b1 = new sap.m.Button({   // content is just one Button
    text : "Decision Tree",
    press: function() {
        sap.m.MessageToast.show("Go to page 2");   // when pressed, it triggers drilldown to page 2
    }
});
var b2 = new sap.m.Button({
    text: "Do nothing",
    press: function() {
        sap.m.MessageToast.show("Go to page 3");
    }
});

var buttonBox = new sap.m.VBox("bBox", {alignItems: "Center", justifyContent: "Center"});
buttonBox.addItem(b1);
buttonBox.addItem(b2);


    Main.addContent(buttonBox);
	SPS.addPage(Main);
	SPS.placeAt("content");
});
