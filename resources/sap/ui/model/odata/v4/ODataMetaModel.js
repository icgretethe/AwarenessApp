/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/BindingMode","sap/ui/model/ContextBinding","sap/ui/model/Context","sap/ui/model/FilterProcessor","sap/ui/model/json/JSONListBinding","sap/ui/model/MetaModel","sap/ui/model/PropertyBinding","./_ODataHelper","./lib/_SyncPromise"],function(q,B,C,a,F,J,M,P,_,b){"use strict";var D=q.sap.log.Level.DEBUG,O,c,o="sap.ui.model.odata.v4.ODataMetaModel",d,r=/\([^/]*|\/\d+/g,f=/^\d+$/,u={"Edm.Boolean":{type:"sap.ui.model.odata.type.Boolean"},"Edm.Byte":{type:"sap.ui.model.odata.type.Byte"},"Edm.Date":{type:"sap.ui.model.odata.type.Date"},"Edm.DateTimeOffset":{constraints:{"$Precision":"precision"},type:"sap.ui.model.odata.type.DateTimeOffset"},"Edm.Decimal":{constraints:{"$Precision":"precision","$Scale":"scale"},type:"sap.ui.model.odata.type.Decimal"},"Edm.Double":{type:"sap.ui.model.odata.type.Double"},"Edm.Guid":{type:"sap.ui.model.odata.type.Guid"},"Edm.Int16":{type:"sap.ui.model.odata.type.Int16"},"Edm.Int32":{type:"sap.ui.model.odata.type.Int32"},"Edm.Int64":{type:"sap.ui.model.odata.type.Int64"},"Edm.SByte":{type:"sap.ui.model.odata.type.SByte"},"Edm.Single":{type:"sap.ui.model.odata.type.Single"},"Edm.String":{constraints:{"@com.sap.vocabularies.Common.v1.IsDigitSequence":"isDigitSequence","$MaxLength":"maxLength"},type:"sap.ui.model.odata.type.String"},"Edm.TimeOfDay":{constraints:{"$Precision":"precision"},type:"sap.ui.model.odata.type.TimeOfDay"}},s={messageChange:true},W=q.sap.log.Level.WARNING;O=C.extend("sap.ui.model.odata.v4.ODataMetaContextBinding",{constructor:function(m,p,e){C.call(this,m,p,e);},initialize:function(){var e=this.oModel.createBindingContext(this.sPath,this.oContext);this.bInitial=false;if(e!==this.oElementContext){this.oElementContext=e;this._fireChange();}},setContext:function(e){if(e!==this.oContext){this.oContext=e;if(!this.bInitial){this.initialize();}}}});c=J.extend("sap.ui.model.odata.v4.ODataMetaListBinding",{applyFilter:function(){var t=this;this.aIndices=F.apply(this.aIndices,this.aFilters.concat(this.aApplicationFilters),function(R,p){return p==="@sapui.name"?R:t.oModel.getProperty(p,t.oList[R]);});this.iLength=this.aIndices.length;},constructor:function(){J.apply(this,arguments);},enableExtendedChangeDetection:function(){throw new Error("Unsupported operation");}});d=P.extend("sap.ui.model.odata.v4.ODataMetaPropertyBinding",{constructor:function(){P.apply(this,arguments);this.vValue=this.oModel.getProperty(this.sPath,this.oContext);},getValue:function(){return this.vValue;},setValue:function(){throw new Error("Unsupported operation: ODataMetaPropertyBinding#setValue");}});var g=M.extend("sap.ui.model.odata.v4.ODataMetaModel",{constructor:function(R,U,A){M.call(this);this.aAnnotationUris=A&&!Array.isArray(A)?[A]:A;this.sDefaultBindingMode=B.OneTime;this.oMetadataPromise=null;this.oRequestor=R;this.mSupportedBindingModes={"OneTime":true};this.sUrl=U;}});g.prototype._getObject=function(p,e){var i=false,I=p==="@"||p===""&&e.getPath().slice(-2)==="/@"||p.slice(-2)==="/@",k,h,R;if(I||p==="/"){h=p;}else if(p){h=p+"/";}else{h="./";}R=this.getObject(h,e);for(k in R){if(k[0]==="$"||I===(k[0]!=="@")){if(!i){R=q.extend({},R);i=true;}delete R[k];}}return R;};g.prototype._mergeMetadata=function(m){var R=m[0],t=this;function e(E){if(E.$kind==="Schema"&&E.$Annotations){Object.keys(E.$Annotations).forEach(function(T){if(!R.$Annotations[T]){R.$Annotations[T]=E.$Annotations[T];}else{q.extend(R.$Annotations[T],E.$Annotations[T]);}});delete E.$Annotations;}}R.$Annotations=R.$Annotations||{};Object.keys(R).forEach(function(E){e(R[E]);});m.slice(1).forEach(function(A,i){Object.keys(A).forEach(function(k){var E=A[k];if(E.$kind!==undefined||Array.isArray(E)){if(R[k]){throw new Error("Overwriting '"+k+"' with the value defined in '"+t.aAnnotationUris[i]+"' is not supported");}R[k]=E;e(E);}});});return R;};g.prototype.attachEvent=function(e){if(!(e in s)){throw new Error("Unsupported event '"+e+"': v4.ODataMetaModel#attachEvent");}return M.prototype.attachEvent.apply(this,arguments);};g.prototype.bindContext=function(p,e){return new O(this,p,e);};g.prototype.bindList=function(p,e,S,h){return new c(this,p,e,S,h);};g.prototype.bindProperty=function(p,e){return new d(this,p,e);};g.prototype.bindTree=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#bindTree");};g.prototype.fetchCanonicalPath=function(h){return this.fetchEntityContainer().then(function(S){var j,E=S[S.$EntityContainer],k,l,m,p,n=h.getPath().split("/");function t(e,i){var z=h.getPath();if(i&&i!==z){e=e+" at "+i;}q.sap.log.error(e,z,o);throw new Error(z+": "+e);}function v(L){if(l.$kind==="Singleton"){return b.resolve(k);}return w(L).then(function(K){return k+K;});}function w(L){var e=n.slice(0,L).join("/");return h.fetchAbsoluteValue(e).then(function(i){return x(i,e);});}function x(i,z){try{return _.getKeyPredicate(m,i);}catch(e){t(e.message,z);}}function y(i){var N,e,z;if(i===n.length){if(j){return"/"+j;}if(l.$kind==="Singleton"){return"/"+k;}return h.fetchValue("").then(function(A){return"/"+k+x(A);});}z=n[i];if(f.test(z)){if(!l){return w(i+1).then(function(K){j+=K;return y(i+1);});}return y(i+1);}p=z.indexOf("(");e=decodeURIComponent(p>0?z.slice(0,p):z);N=m[e];if(!N||N.$kind!=="NavigationProperty"){t("Not a navigation property: "+e);}if(!l||(j&&N.$ContainsTarget)){j+="/"+z;m=S[N.$Type];l=undefined;return y(i+1);}if(N.$ContainsTarget){return v(i).then(function(A){j=A+"/"+z;l=undefined;m=S[N.$Type];return y(i+1);});}k=l.$NavigationPropertyBinding[e];l=E[k];m=S[N.$Type];k=encodeURIComponent(k);j=p>0?k+z.slice(p):undefined;return y(i+1);}p=n[1].indexOf("(");if(p>0){j=n[1];k=j.slice(0,p);}else{k=n[1];}l=E[decodeURIComponent(k)];m=S[l.$Type];return y(2);});};g.prototype.fetchEntityContainer=function(){var p,t=this;if(!this.oMetadataPromise){p=[b.resolve(this.oRequestor.read(this.sUrl))];if(this.aAnnotationUris){this.aAnnotationUris.forEach(function(A){p.push(b.resolve(t.oRequestor.read(A,true)));});}this.oMetadataPromise=b.all(p).then(function(m){return t._mergeMetadata(m);});}return this.oMetadataPromise;};g.prototype.fetchObject=function(p,e){var R=this.resolve(p,e);if(!R){q.sap.log.error("Invalid relative path w/o context",p,o);return b.resolve(null);}return this.fetchEntityContainer().then(function(S){var l,n,h=true,j,k,t,v=S;function m(L){var i;if(q.sap.log.isLoggable(L)){i=Array.isArray(l)?l.join("/"):l;q.sap.log[L===D?"debug":"warning"](Array.prototype.slice.call(arguments,1).join("")+(i?" at /"+i:""),R,o);}v=undefined;return false;}function w(Q,i){if(!(Q in S)){l=l||t&&t+"/"+i;return m(W,"Unknown qualified name '",Q,"'");}t=n=k=Q;v=j=S[k];return true;}function x(z,i,A){var I,E,G;if(z==="$Annotations"){return m(W,"Invalid segment: $Annotations");}if(z.length>11&&z.slice(-11)==="@sapui.name"){I=z.length-11;}else{I=z.indexOf("@");}if(I>0){if(!x(z.slice(0,I),i,A)){return false;}z=z.slice(I);G=true;}if(!(G&&z==="@sapui.name")&&typeof v==="string"&&!y(v,A.slice(0,i))){return false;}if(h){if(z[0]==="$"||f.test(z)){h=false;}else if(!G){if(z[0]!=="@"&&z.indexOf(".")>0){return w(z);}else if(v&&"$Type"in v){if(!w(v.$Type,"$Type")){return false;}}else if(v&&"$Action"in v){if(!w(v.$Action,"$Action")){return false;}}else if(v&&"$Function"in v){if(!w(v.$Function,"$Function")){return false;}}else if(i===0){t=n=k=k||S.$EntityContainer;v=j=j||S[k];if(z&&z[0]!=="@"&&!(z in j)){return m(W,"Unknown child '",z,"' of '",k,"'");}}if(Array.isArray(v)){if(v.length!==1){return m(W,"Unsupported overloads");}v=v[0].$ReturnType;t=t+"/0/$ReturnType";if(v){if(z==="value"&&!(S[v.$Type]&&S[v.$Type].value)){n=undefined;return true;}if(!w(v.$Type,"$Type")){return false;}}}}}if(!z){return i+1>=A.length||m(W,"Invalid empty segment");}if(z==="@sapui.name"){v=n;if(v===undefined){m(W,"Unsupported path before @sapui.name");}else if(i+1<A.length){m(W,"Unsupported path after @sapui.name");}return false;}if(!v||typeof v!=="object"){return m(D,"Invalid segment: ",z);}if(h&&z[0]==="@"){E=k.slice(0,k.lastIndexOf(".")+1);v=E===k?j:(S.$Annotations||{})[t]||{};h=false;}if(z!=="@"){n=h||z[0]==="@"?z:undefined;t=h?t+"/"+z:undefined;v=v[z];}return true;}function y(i,N){var z;if(l){return m(W,"Invalid recursion");}l=N;h=true;v=S;z=i.split("/").every(x);l=undefined;return z;}y(R.slice(1));return v;});};g.prototype.fetchUI5Type=function(p){var m=this.getMetaContext(p),t=this;return this.fetchObject(undefined,m).then(function(e){var h,n,T=e["$ui5.type"],i,j="sap.ui.model.odata.type.Raw";function k(K,v){if(v!==undefined){h=h||{};h[K]=v;}}if(T){return T;}if(e.$isCollection){q.sap.log.warning("Unsupported collection type, using "+j,p,o);}else{i=u[e.$Type];if(i){j=i.type;for(n in i.constraints){k(i.constraints[n],n[0]==="@"?t.getObject(n,m):e[n]);}if(e.$Nullable===false){k("nullable",false);}}else{q.sap.log.warning("Unsupported type '"+e.$Type+"', using "+j,p,o);}}T=new(q.sap.getObject(j,0))(undefined,h);e["$ui5.type"]=T;return T;});};g.prototype.getMetaContext=function(p){return new a(this,p.replace(r,""));};g.prototype.getOriginalProperty=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#getOriginalProperty");};g.prototype.getObject=b.createGetMethod("fetchObject");g.prototype.getProperty=g.prototype.getObject;g.prototype.getUI5Type=b.createGetMethod("fetchUI5Type",true);g.prototype.isList=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#isList");};g.prototype.refresh=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#refresh");};g.prototype.requestObject=b.createRequestMethod("fetchObject");g.prototype.requestUI5Type=b.createRequestMethod("fetchUI5Type");g.prototype.resolve=function(p,e){var h,i;if(!p){return e?e.getPath():undefined;}i=p[0];if(i==="/"){return p;}if(!e){return undefined;}if(i==="."){if(p[1]!=="/"){throw new Error("Unsupported relative path: "+p);}p=p.slice(2);}h=e.getPath();return i==="@"||h.slice(-1)==="/"?h+p:h+"/"+p;};g.prototype.setLegacySyntax=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#setLegacySyntax");};g.prototype.toString=function(){return o+": "+this.sUrl;};return g;},true);