/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var N={};N.render=function(r,c){var a=r;var i=c.getId();a.addClass("sapUiUx3NavBar").addClass("sapUiUx3NavBarUpperCaseText");if(c.getToplevelVariant()){a.addClass("sapUiUx3NavBarToplevel");}a.write("<nav");a.writeControlData(c);a.writeClasses();a.write("role='navigation'>");a.write("<ul id='"+i+"-list' role='menubar' class='sapUiUx3NavBarList'");a.addStyle("white-space","nowrap");a.writeStyles();a.write(">");N.renderItems(a,c);a.write("</ul>");a.write("<a id='"+i+"-ofb' role='presentation' class='sapUiUx3NavBarBack' href='javascript:void(0)'>");a.write("<a id='"+i+"-off' role='presentation' class='sapUiUx3NavBarForward' href='javascript:void(0)'>");a.write("<a id='"+i+"-ofl' role='presentation' class='sapUiUx3NavBarOverflowBtn' href='javascript:void(0)'>");a.writeIcon("sap-icon://overflow",[],{id:i+"-oflt"});a.write("</a>");a.write("</nav>");};N.renderItems=function(r,c){var I=c.getItems();var n=false;if(!I||I.length==0){I=c.getAssociatedItems();n=true;}var a=I.length;r.write("<li");r.addStyle("display","inline-block");r.writeStyles();r.write(">");r.write("<a id='"+c.getId()+"-dummyItem' class='sapUiUx3NavBarDummyItem sapUiUx3NavBarItem'>&nbsp;</a></li>");var s=c.getSelectedItem();for(var i=0;i<a;i++){var b=n?sap.ui.getCore().byId(I[i]):I[i];if(b.getVisible()){var d=b.getId();var e=d==s;r.write("<li");r.addStyle("display","inline-block");r.writeStyles();if(e){r.write(" class='sapUiUx3NavBarItemSel'");}r.write("><a ");r.writeElementData(b);r.writeAttributeEscaped("href",b.getHref()||"javascript:void(0);");r.write(" aria-setsize='"+a+"' aria-posinset='"+(i+1)+"' role='menuitemradio' class='sapUiUx3NavBarItem'");if(e){r.write(" tabindex='0'");}r.write(" aria-checked='"+(e?"true":"false")+"'");var t=b.getTooltip_AsString();if(t){r.write(" title='"+q.sap.encodeHTML(t)+"'");}r.write(">");r.write(q.sap.encodeHTML(b.getText()));r.write("</a></li>");}}var f;if(c._bRtl){f="right:"+c._iLastArrowPos;}else{f="left:"+c._iLastArrowPos;}r.write("<span id='"+c.getId()+"-arrow' style='"+f+"px;");r.write("' class='sapUiUx3NavBarArrow'></span>");};return N;},true);
