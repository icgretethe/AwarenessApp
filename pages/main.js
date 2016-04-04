// SPS = Suicide Prevention Squad
sap.ui.getCore().attachInit(function () {
	//PAGE DECLARATIONS
	var SPS = new sap.m.App("SPS", {
			initialPage : "Main",
			treePage : "treePage"
	});
	
	var Main = new sap.m.Page("Main", {
			title : "We're Here to Help"
	});
	
	var treePage = new sap.m.Page("treePage", {
			title : "Let's Diagnose the Issue"
	});
		
	//BUTTONS FOR MAIN PAGE
	var treeButton = new sap.m.Button({ // content is just one Button
		text : "Decision Tree",
		press : function () {
			sap.m.MessageToast.show("Heading to Help Tree"); // when pressed, it triggers drilldown to page 2
			SPS.to(treePage);
		}
	});
	
	var b2 = new sap.m.Button({
		text : "Do nothing",
		press : function () {
			sap.m.MessageToast.show("Go to page 3");
		}
	});

	//ATTATCHMENT FUNCTIONS
	var buttonBox = new sap.m.VBox("bBox", {
		alignItems : "Center",
		justifyContent : "Center"
	});
	
	buttonBox.addItem(treeButton);
	buttonBox.addItem(b2);
	
	/*default sizes: The respective image sizes are 57/114 px for the phone and 72/144 px for the tablet. 
	  If an object is given but one of the sizes is not given, the largest given icon will be used for this size.*/
	//SPS.setHomeIcon({ 'phone':'phone-icon.png', 'phone@2':'phone-retina.png', 'tablet':'tablet-icon.png', 'tablet@2':'tablet-retina.png', 'icon':'desktop.ico' });

	//INITIALIZES CONTENTS INTO index.html
	Main.addContent(buttonBox);
	SPS.addPage(Main);
	SPS.addPage(treePage);
	SPS.placeAt("content");
});
