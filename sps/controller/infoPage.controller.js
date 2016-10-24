// when the back button is pressed, person returns to main page
sap.ui.controller("sps.controller.infoPage", {
	onInit: function() {
        var alphaToInt = function (num) {
            var tempNum = num;
            // ABC -> 2
            tempNum = tempNum.replace("A", "2");
            tempNum = tempNum.replace("B", "2");
            tempNum = tempNum.replace("C", "2");
            // DEF -> 3
            tempNum = tempNum.replace("D", "3");
            tempNum = tempNum.replace("E", "3");
            tempNum = tempNum.replace("F", "3");
            // GHI -> 4
            tempNum = tempNum.replace("G", "4");
            tempNum = tempNum.replace("H", "4");
            tempNum = tempNum.replace("I", "4");
            // JKL -> 5
            tempNum = tempNum.replace("J", "5");
            tempNum = tempNum.replace("K", "5");
            tempNum = tempNum.replace("L", "5");
            // MNO -> 6
            tempNum = tempNum.replace("M", "6");
            tempNum = tempNum.replace("N", "6");
            tempNum = tempNum.replace("O", "6");
            // PQRS -> 7
            tempNum = tempNum.replace("P", "7");
            tempNum = tempNum.replace("Q", "7");
            tempNum = tempNum.replace("R", "7");
            tempNum = tempNum.replace("S", "7");
            // TUV -> 8
            tempNum = tempNum.replace("T", "8");
            tempNum = tempNum.replace("U", "8");
            tempNum = tempNum.replace("V", "8");
            // WXYZ -> 9
            tempNum = tempNum.replace("W", "9");
            tempNum = tempNum.replace("X", "9");
            tempNum = tempNum.replace("Y", "9");
            tempNum = tempNum.replace("Z", "9");

            return tempNum;
        };
		// create JSON model to manage data
		//JSON model was created in treePage, edit future
		var contactList = this.getView().byId("list");
		contactList.bindItems({
			path: "/Contacts",
			template: new sap.m.ObjectListItem({
				type: "Active",
                title: "{text}",
                number: "{phone}",
                tap: function() {
                    var temp = this.getNumber();
                    console.log("Phone Number: " + temp);
                    var tel = "tel:" + alphaToInt(temp);
                    console.log("Telephone: " + tel);
                    sap.m.URLHelper.triggerTel(tel);
                }
                /*
				attributes: [new sap.m.ObjectAttribute({
				text: "{text}"
				})]
                */

			})
		})
	},

    goHome: function() {
        app.back();
    }
});
