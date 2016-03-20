// SPS = Suicide Prevention Squad
sap.ui.getCore().attachInit(function () {
	var SPS = new sap.m.App("SPS", {
					initialPage: "Main"
				});
	var Main = new sap.m.Page("Main", {
		  title: "We're Here to Help",
		  content : new sap.m.Button({   // content is just one Button
			text : "Go to Page 2",
			press: function() {
				SPS.alert("Test")   // when pressed, it triggers drilldown to page 2
			}
		})                
	});
	SPS.addPage(Main);
	SPS.placeAt("content");
});