// when the back button is pressed, person returns to main page
sap.ui.controller("sps.controller.infoPage", {
	onInit: function() {
        /**
         * This function converts phone number letters
         * into numbers, e.g., 123-555-TALK becomes 123-555-8255
         */
        var alphaToInt = function (num) {
            var tempNum = num;
            // ABC -> 2
            tempNum = tempNum.replace(/A|B|C/gi, "2");
            // DEF -> 3
            tempNum = tempNum.replace(/D|E|F/gi, "3");
            // GHI -> 4
            tempNum = tempNum.replace(/G|H|I/gi, "4");
            // JKL -> 5
            tempNum = tempNum.replace(/J|K|L/gi, "5");
            // MNO -> 6
            tempNum = tempNum.replace(/M|N|O/gi, "6");
            // PQRS -> 7
            tempNum = tempNum.replace(/P|Q|R|S/gi, "7");
            // TUV -> 8
            tempNum = tempNum.replace(/T|U|V/gi, "8");
            // WXYZ -> 9
            tempNum = tempNum.replace(/W|X|Y|Z/gi, "9");

            return tempNum;

        };
		// create JSON model to manage data
		// JSON model was created in warnPage, edit future
		var contactList = this.getView().byId("list");
		contactList.bindItems({
			path: "/Contacts",
			template: new sap.m.ObjectListItem({
				type: "Active",
                title: "{text}",
                number: "{phone}",
                tap: function() {
                    var temp = this.getNumber();
                    temp = temp.replace('/ /g', '')
                    if(temp !== "") {
                        console.log("Phone Number: " + temp);
                        var tel = "tel:" + alphaToInt(temp);
                        console.log("Telephone: " + tel);
                        // open phone app
                        sap.m.URLHelper.triggerTel(tel);
                    }
                }
			})
		})
	},

    goHome: function() {
        app.back();
    }
});
