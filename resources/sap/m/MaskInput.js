/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./InputBase','./MaskInputRule','sap/ui/core/Control'],function(q,I,M,C){"use strict";var a=I.extend("sap.m.MaskInput",{metadata:{library:"sap.m",properties:{placeholderSymbol:{type:"string",group:"Misc",defaultValue:"_"},mask:{type:"string",group:"Misc",defaultValue:null}},aggregations:{rules:{type:"sap.m.MaskInputRule",multiple:true,singularName:"rule"}}}});var E='^';a.prototype.init=function(){this._iCaretTimeoutId=null;this._iUserInputStartPosition=null;this._iMaskLength=null;this._sOldInputValue=null;this._oRules=null;this._oTempValue=null;this._bSkipSetupMaskVariables=null;this._setDefaultRules();};a.prototype.exit=function(){this._iCaretTimeoutId=null;this._iUserInputStartPosition=null;this._iMaskLength=null;this._sOldInputValue=null;this._oRules=null;this._oTempValue=null;this._bSkipSetupMaskVariables=null;};a.prototype.onBeforeRendering=function(){var v=this._validateDependencies();if(v){q.sap.log.warning("Invalid mask input: "+v);}I.prototype.onBeforeRendering.apply(this,arguments);};a.prototype.onAfterRendering=function(){I.prototype.onAfterRendering.apply(this,arguments);};a.prototype.onfocusin=function(e){this._sOldInputValue=this._getInputValue();I.prototype.onfocusin.apply(this,arguments);if(!this._oTempValue.differsFromOriginal()||!this._isValidInput(this._sOldInputValue)){this._applyMask();}this._positionCaret(true);};a.prototype.onfocusout=function(e){this.bFocusoutDueRendering=this.bRenderingPhase;this.$().toggleClass("sapMFocus",false);q(document).off('.sapMIBtouchstart');if(this.bRenderingPhase){return;}this.closeValueStateMessage();this._inputCompletedHandler();};a.prototype.oninput=function(e){I.prototype.oninput.apply(this,arguments);this._applyMask();this._positionCaret(false);};a.prototype.onkeypress=function(e){this._keyPressHandler(e);};a.prototype.onkeydown=function(e){var k=this._parseKeyBoardEvent(e),B=sap.ui.Device.browser,i;i=(k.bBackspace||k.bDelete)&&B.msie&&B.version<10;if(!i){I.prototype.onkeydown.apply(this,arguments);}this._keyDownHandler(e,k);};a.prototype.onsapenter=function(e){};a.prototype.onsapfocusleave=function(e){};a.prototype.setValue=function(v){v=this.validateProperty('value',v);I.prototype.setValue.call(this,v);this._sOldInputValue=v;if(!this._oTempValue){this._setupMaskVariables();}if(this._oTempValue._aInitial.join('')!==v&&v.length){this._applyRules(v);}return this;};a.prototype.addAggregation=function(A,o,s){if(A==="rules"){if(!this._validateRegexAgainstPlaceHolderSymbol(o)){return this;}this._removeRuleWithSymbol(o.getMaskFormatSymbol());C.prototype.addAggregation.apply(this,arguments);if(!this._bSkipSetupMaskVariables){this._setupMaskVariables();}return this;}return C.prototype.addAggregation.apply(this,arguments);};a.prototype.insertAggregation=function(A,o,i,s){if(A==="rules"){if(!this._validateRegexAgainstPlaceHolderSymbol(o)){return this;}this._removeRuleWithSymbol(o.getMaskFormatSymbol());C.prototype.insertAggregation.apply(this,arguments);this._setupMaskVariables();return this;}return C.prototype.insertAggregation.apply(this,arguments);};a.prototype._validateRegexAgainstPlaceHolderSymbol=function(r){if(new RegExp(r.getRegex()).test(this.getPlaceholderSymbol())){q.sap.log.error("Rejecting input mask rule because it includes the currently set placeholder symbol.");return false;}return true;};a.prototype.setPlaceholderSymbol=function(s){var S;if(!/^.$/i.test(s)){q.sap.log.error("Invalid placeholder symbol string given");return this;}S=this.getRules().some(function(r){return new RegExp(r.getRegex()).test(s);});if(S){q.sap.log.error("Rejecting placeholder symbol because it is included as a regex in an existing mask input rule.");}else{this.setProperty("placeholderSymbol",s);this._setupMaskVariables();}return this;};a.prototype.setMask=function(m){if(!m){var e="Setting an empty mask is pointless. Make sure you set it with a non-empty value.";q.sap.log.warning(e);return this;}this.setProperty("mask",m,true);this._setupMaskVariables();return this;};a.prototype._isCharAllowed=function(c,i){return this._oRules.applyCharAt(c,i);};a.prototype._feedReplaceChar=function(c,p,s){return c;};var b=function(c){this._aInitial=c.slice(0);this._aContent=c;};b.prototype.setCharAt=function(c,p){this._aContent[p]=c;};b.prototype.charAt=function(p){return this._aContent[p];};b.prototype.toString=function(){return this._aContent.join('');};b.prototype.differsFromOriginal=function(){return this.differsFrom(this._aInitial);};b.prototype.differsFrom=function(v){var i=0;if(v.length!==this._aContent.length){return true;}for(;i<v.length;i++){if(v[i]!==this._aContent[i]){return true;}}return false;};b.prototype.getSize=function(){return this._aContent.length;};var T=function(r){this._aRules=r;};T.prototype.nextTo=function(c){if(typeof c==="undefined"){c=-1;}do{c++;}while(c<this._aRules.length&&!this._aRules[c]);return c;};T.prototype.previousTo=function(c){do{c--;}while(!this._aRules[c]&&c>0);return c;};T.prototype.hasRuleAt=function(i){return!!this._aRules[i];};T.prototype.applyCharAt=function(c,i){return this._aRules[i].test(c);};a.prototype._setDefaultRules=function(){this._bSkipSetupMaskVariables=true;this.addRule(new sap.m.MaskInputRule({maskFormatSymbol:"a",regex:"[A-Za-z]"}),true);this.addRule(new sap.m.MaskInputRule({maskFormatSymbol:"9",regex:"[0-9]"}),true);this._bSkipSetupMaskVariables=false;};a.prototype._validateDependencies=function(){var p=this.getPlaceholderSymbol(),r=this.getRules(),m=[],e=[];if(!this.getMask()){e.push("Empty mask");}if(r.length){m=[];r.every(function(R){var s=R.getMaskFormatSymbol(),c=s!==p,d;d=!m.some(function(S){return s===S;});m.push(s);if(!c){e.push("Placeholder symbol is the  same as the existing rule's mask format symbol");}if(!d){e.push("Duplicated rule's maskFormatSymbol ["+s+"]");}return c&&d;});}return e.length?e.join(". "):null;};a.prototype._removeRuleWithSymbol=function(s){var S=this._findRuleBySymbol(s,this.getRules());if(S){this.removeAggregation('rules',S.oRule);}};a.prototype._findRuleBySymbol=function(m,r){var R=null;if(typeof m!=="string"||m.length!==1){q.sap.log.error(m+" is not a valid mask rule symbol");return null;}q.each(r,function(i,o){if(o.getMaskFormatSymbol()===m){R={oRule:o,iIndex:i};return false;}});return R;};a.prototype._getTextSelection=function(){var _=q(this.getFocusDomRef());if(!_&&(_.length===0||_.is(":hidden"))){return;}return{iFrom:_[0].selectionStart,iTo:_[0].selectionEnd,bHasSelection:(_[0].selectionEnd-_[0].selectionStart!==0)};};a.prototype._setCursorPosition=function(p){return q(this.getFocusDomRef()).cursorPos(p);};a.prototype._getCursorPosition=function(){return q(this.getFocusDomRef()).cursorPos();};a.prototype._setupMaskVariables=function(){var r=this.getRules(),m=this.getMask(),s=this._getSkipIndexes(m),c=this._getMaskArray(m,s),p=this.getPlaceholderSymbol(),i=this._buildMaskValueArray(c,p,r,s),t=this._buildRules(c,r,s);this._oTempValue=new b(i);this._iMaskLength=t.length;this._oRules=new T(t);this._iUserInputStartPosition=this._oRules.nextTo();};a.prototype._getMaskArray=function(m,s){var l=Array.isArray(s)?s.length:0,c=(m)?m.split(""):[],i;for(i=0;i<l;i++){c.splice(s[i],1);}return c;};a.prototype._getSkipIndexes=function(m){var l=(m)?m.length:0,i,s=[],p=0,L=false;for(i=0;i<l;i++){if(m[i]===E&&!L){s.push(i-p);L=true;p++;}else{L=false;}}return s;};a.prototype._applyMask=function(){var m=this._getInputValue();if(!this.getEditable()){return;}this._applyAndUpdate(m);};a.prototype._resetTempValue=function(f,t){var i,p=this.getPlaceholderSymbol();if(typeof f==="undefined"||f===null){f=0;t=this._oTempValue.getSize()-1;}for(i=f;i<=t;i++){if(this._oRules.hasRuleAt(i)){this._oTempValue.setCharAt(p,i);}}};a.prototype._applyAndUpdate=function(m){this._applyRules(m);this.updateDomValue(this._oTempValue.toString());};a.prototype._findFirstPlaceholderPosition=function(){return this._oTempValue.toString().indexOf(this.getPlaceholderSymbol());};a.prototype._applyRules=function(i){var c,d=0,m,p=this.getPlaceholderSymbol(),e;for(m=0;m<this._iMaskLength;m++){if(this._oRules.hasRuleAt(m)){this._oTempValue.setCharAt(p,m);e=false;if(i.length){do{c=i.charAt(d);d++;if(this._oRules.applyCharAt(c,m)){this._oTempValue.setCharAt(c,m);e=true;}}while(!e&&(d<i.length));}if(!e){this._resetTempValue(m+1,this._iMaskLength-1);break;}}else{if(this._oTempValue.charAt(m)===i.charAt(d)){d++;}}}};a.prototype._keyPressHandler=function(e){if(!this.getEditable()){return;}var s=this._getTextSelection(),p,c,k=this._parseKeyBoardEvent(e);if(k.bCtrlKey||k.bAltKey||k.bMetaKey||k.bBeforeSpace){return;}if(!k.bEnter&&!k.bShiftLeftOrRightArrow&&!k.bHome&&!k.bEnd&&!(k.bShift&&k.bDelete)&&!(k.bCtrlKey&&k.bInsert)&&!(k.bShift&&k.bInsert)){if(s.bHasSelection){this._resetTempValue(s.iFrom,s.iTo-1);this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(Math.max(this._iUserInputStartPosition,s.iFrom));}p=this._oRules.nextTo(s.iFrom-1);if(p<this._iMaskLength){c=this._feedReplaceChar(k.sChar,p,this._getInputValue());this._feedNextString(c,p);}e.preventDefault();}};a.prototype.oncut=function(e){var s=this._getTextSelection(),m=this._getMinBrowserDelay(),B=s.iFrom,i=s.iTo;I.prototype.oncut(e);if(!s.bHasSelection){return;}i=i-1;this._resetTempValue(B,i);q.sap.delayedCall(m,this,function updateDomAndCursor(v,p,o){this._oTempValue._aContent=o;this.updateDomValue(v);q.sap.delayedCall(m,this,this._setCursorPosition,[p]);},[this._oTempValue.toString(),Math.max(this._iUserInputStartPosition,B),this._oTempValue._aContent.slice(0)]);};a.prototype._keyDownHandler=function(e,k){var d,s,B,i,c,n,k=k||this._parseKeyBoardEvent(e);if(!this.getEditable()){return;}if(!k.bShift&&(k.bArrowRight||k.bArrowLeft)){c=this._getCursorPosition();s=this._getTextSelection();d=this._determineArrowKeyDirection(k,s);if(this._isRtlMode()&&s.bHasSelection){n=this._determineRtlCaretPositionFromSelection(d);}else{n=this._oRules[d](c);}if(this._isWebkitProblematicCase()){n=this._fixWebkitBorderPositions(n,d);}this._setCursorPosition(n);e.preventDefault();}else if(k.bEscape){this._applyAndUpdate(this._sOldInputValue);this._positionCaret(true);e.preventDefault();}else if(k.bEnter){this._inputCompletedHandler(e);}else if((k.bCtrlKey&&k.bInsert)||(k.bShift&&k.bInsert)){I.prototype.onkeydown.apply(this,arguments);}else if((!k.bShift&&k.bDelete)||k.bBackspace){s=this._getTextSelection();B=s.iFrom;i=s.iTo;if(!s.bHasSelection){if(k.bBackspace){B=this._oRules.previousTo(B);}}if(k.bBackspace||(k.bDelete&&s.bHasSelection)){i=i-1;}this._resetTempValue(B,i);this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(Math.max(this._iUserInputStartPosition,B));e.preventDefault();}};a.prototype._feedNextString=function(n,p){var N,A=false,c=n.split(""),s;while(c.length){s=c.splice(0,1)[0];if(this._oRules.applyCharAt(s,p)){A=true;this._oTempValue.setCharAt(s,p);p=this._oRules.nextTo(p);}}if(A){N=p;this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(N);}};a.prototype._inputCompletedHandler=function(){var n=this._getInputValue(),t,v,e,c;if(this._oTempValue.differsFrom(n)){this._applyAndUpdate(n);}t=this._oTempValue.differsFromOriginal();v=t?this._oTempValue.toString():"";e=!this._sOldInputValue;c=!n;if(e&&(c||!t)){this.updateDomValue("");return;}if(this._sOldInputValue!==this._oTempValue.toString()){I.prototype.setValue.call(this,v);this._sOldInputValue=v;if(this.onChange&&!this.onChange({value:v})){this.fireChangeEvent(v);}}};a.prototype._buildMaskValueArray=function(m,p,r,s){return m.map(function(c,i){var n=s.indexOf(i)===-1,R=this._findRuleBySymbol(c,r);return(n&&R)?p:c;},this);};a.prototype._buildRules=function(m,r,s){var t=[],S,l=m.length,i=0;for(;i<l;i++){if(s.indexOf(i)===-1){S=this._findRuleBySymbol(m[i],r);t.push(S?new RegExp(S.oRule.getRegex()):null);}else{t.push(null);}}return t;};a.prototype._parseKeyBoardEvent=function(e){var p=e.which||e.keyCode,k=q.sap.KeyCodes,A=p===k.ARROW_RIGHT,c=p===k.ARROW_LEFT,s=e.shiftKey;return{iCode:p,sChar:String.fromCharCode(p),bCtrlKey:e.ctrlKey,bAltKey:e.altKey,bMetaKey:e.metaKey,bShift:s,bInsert:p===q.sap.KeyCodes.INSERT,bBackspace:p===k.BACKSPACE,bDelete:p===k.DELETE,bEscape:p===k.ESCAPE,bEnter:p===k.ENTER,bIphoneEscape:(sap.ui.Device.system.phone&&sap.ui.Device.os.ios&&p===127),bArrowRight:A,bArrowLeft:c,bHome:p===q.sap.KeyCodes.HOME,bEnd:p===q.sap.KeyCodes.END,bShiftLeftOrRightArrow:s&&(c||A),bBeforeSpace:p<k.SPACE};};a.prototype._positionCaret=function(s){var m=this.getMask(),i=this._getMinBrowserDelay(),e;clearTimeout(this._iCaretTimeoutId);e=this._findFirstPlaceholderPosition();if(e<0){e=m.length;}this._iCaretTimeoutId=q.sap.delayedCall(i,this,function(){if(this.getFocusDomRef()!==document.activeElement){return;}if(s&&(e===(m.length))){this.selectText(0,e);}else{this._setCursorPosition(e);}});};a.prototype._getMinBrowserDelay=function(){return!sap.ui.Device.browser.msie?4:50;};a.prototype._isValidInput=function(s){var l=s.length,i=0,c;for(;i<l;i++){c=s[i];if(this._oRules.hasRuleAt(i)&&(!this._oRules.applyCharAt(c,i)&&c!==this.getPlaceholderSymbol())){return false;}if(!this._oRules.hasRuleAt(i)&&c!==this._oTempValue.charAt(i)){return false;}}return true;};a.prototype._isRtlChar=function(s){var l='A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',r='\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',c=new RegExp('^[^'+l+']*['+r+']');return c.test(s);};a.prototype._fixWebkitBorderPositions=function(c,d){var t=this._oTempValue.toString().length;if(d==='nextTo'){if(c===0||c===t||c===1){c=0;}else if(c===t+1){c=1;}}else{if(c===0||c===t-1){c=t;}else if(c===-1||c===t){c=t-1;}}return c;};a.prototype._containsRtlChars=function(){var t=this._oTempValue.toString(),c=false;for(var i=0;i<t.length;i++){c=this._isRtlChar(t[i]);}return c;};a.prototype._isRtlMode=function(){return sap.ui.getCore().getConfiguration().getRTL()||(this.getTextDirection()===sap.ui.core.TextDirection.RTL);};a.prototype._isWebkitProblematicCase=function(){return(sap.ui.Device.browser.webkit&&this._isRtlMode()&&!this._containsRtlChars());};a.prototype._determineArrowKeyDirection=function(k,s){var d;if(!this._isRtlMode()||!this._containsRtlChars()||s.bHasSelection){if(k.bArrowRight){d='nextTo';}else{d='previousTo';}}else{if(k.bArrowRight){d='previousTo';}else{d='nextTo';}}return d;};a.prototype._determineRtlCaretPositionFromSelection=function(d,w){var n,s=this._getTextSelection();if(w){if(d==='nextTo'){if(!this._containsRtlChars()){n=s.iFrom;}else{n=s.iTo;}}else{if(!this._containsRtlChars()){n=s.iTo;}else{n=s.iFrom;}}}else{if(d==='nextTo'){if(!this._containsRtlChars()){n=s.iTo;}else{n=s.iFrom;}}else{if(!this._containsRtlChars()){n=s.iFrom;}else{n=s.iTo;}}}return n;};return a;},true);
