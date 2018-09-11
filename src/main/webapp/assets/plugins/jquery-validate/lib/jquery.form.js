/*!
 * jQuery Form Plugin
 * version: 3.51.0-2014.06.20
 * Requires jQuery v1.5 or later
 * Copyright (c) 2014 M. Alsup
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
(function(b){if(typeof define==="function"&&define.amd){define(["jquery"],b);
}else{b((typeof(jQuery)!="undefined")?jQuery:window.Zepto);}}(function(i){var l={};l.fileapi=i("<input type='file'/>").get(0).files!==undefined;l.formdata=window.FormData!==undefined;var j=!!i.fn.prop;i.fn.attr2=function(){if(!j){return this.attr.apply(this,arguments);}var a=this.prop.apply(this,arguments);
if((a&&a.jquery)||typeof a==="string"){return a;}return this.attr.apply(this,arguments);};i.fn.ajaxSubmit=function(X){if(!this.length){k("ajaxSubmit: skipping submit process - no element selected");return this;}var Y,P,V,T=this;if(typeof X=="function"){X={success:X};}else{if(X===undefined){X={};}}Y=X.type||this.attr2("method");
P=X.url||this.attr2("action");V=(typeof P==="string")?i.trim(P):"";V=V||window.location.href||"";if(V){V=(V.match(/^([^#]+)/)||[])[1];}X=i.extend(true,{url:V,success:i.ajaxSettings.success,type:Y||i.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},X);
var J={};this.trigger("form-pre-serialize",[this,X,J]);if(J.veto){k("ajaxSubmit: submit vetoed via form-pre-serialize trigger");return this;}if(X.beforeSerialize&&X.beforeSerialize(this,X)===false){k("ajaxSubmit: submit aborted via beforeSerialize callback");return this;}var U=X.traditional;if(U===undefined){U=i.ajaxSettings.traditional;
}var M=[];var L,I=this.formToArray(X.semantic,M);if(X.data){X.extraData=X.data;L=i.param(X.data,U);}if(X.beforeSubmit&&X.beforeSubmit(I,this,X)===false){k("ajaxSubmit: submit aborted via beforeSubmit callback");return this;}this.trigger("form-submit-validate",[I,this,X,J]);if(J.veto){k("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this;}var b=i.param(I,U);if(L){b=(b?(b+"&"+L):L);}if(X.type.toUpperCase()=="GET"){X.url+=(X.url.indexOf("?")>=0?"&":"?")+b;X.data=null;}else{X.data=b;}var e=[];if(X.resetForm){e.push(function(){T.resetForm();});}if(X.clearForm){e.push(function(){T.clearForm(X.includeHidden);});}if(!X.dataType&&X.target){var W=X.success||function(){};
e.push(function(n){var m=X.replaceTarget?"replaceWith":"html";i(X.target)[m](n).each(W,arguments);});}else{if(X.success){e.push(X.success);}}X.success=function(n,s,m){var p=X.context||this;for(var r=0,o=e.length;r<o;r++){e[r].apply(p,[n,s,m||T,T]);}};if(X.error){var a=X.error;X.error=function(n,m,p){var o=X.context||this;
a.apply(o,[n,m,p,T]);};}if(X.complete){var Z=X.complete;X.complete=function(n,m){var o=X.context||this;Z.apply(o,[n,m,T]);};}var N=i("input[type=file]:enabled",this).filter(function(){return i(this).val()!=="";});var S=N.length>0;var Q="multipart/form-data";var c=(T.attr("enctype")==Q||T.attr("encoding")==Q);
var d=l.fileapi&&l.formdata;k("fileAPI :"+d);var O=(S||c)&&!d;var q;if(X.iframe!==false&&(X.iframe||O)){if(X.closeKeepAlive){i.get(X.closeKeepAlive,function(){q=f(I);});}else{q=f(I);}}else{if((S||c)&&d){q=K(I);}else{q=i.ajax(X);}}T.removeData("jqxhr").data("jqxhr",q);for(var R=0;R<M.length;R++){M[R]=null;
}this.trigger("form-submit-notify",[this,X]);return this;function aa(n){var m=i.param(n,X.traditional).split("&");var s=m.length;var p=[];var o,r;for(o=0;o<s;o++){m[o]=m[o].replace(/\+/g," ");r=m[o].split("=");p.push([decodeURIComponent(r[0]),decodeURIComponent(r[1])]);}return p;}function K(s){var p=new FormData();
for(var r=0;r<s.length;r++){p.append(s[r].name,s[r].value);}if(X.extraData){var m=aa(X.extraData);for(r=0;r<m.length;r++){if(m[r]){p.append(m[r][0],m[r][1]);}}}X.data=null;var n=i.extend(true,{},i.ajaxSettings,X,{contentType:false,processData:false,cache:false,type:Y||"POST"});if(X.uploadProgress){n.xhr=function(){var t=i.ajaxSettings.xhr();
if(t.upload){t.upload.addEventListener("progress",function(u){var v=0;var x=u.loaded||u.position;var w=u.total;if(u.lengthComputable){v=Math.ceil(x/w*100);}X.uploadProgress(u,x,w,v);},false);}return t;};}n.data=null;var o=n.beforeSend;n.beforeSend=function(t,u){if(X.formData){u.data=X.formData;}else{u.data=p;
}if(o){o.call(this,t,u);}};return i.ajax(n);}function f(ak){var B=T[0],C,ao,r,am,n,z,w,y,x,m,an,t;var H=i.Deferred();H.abort=function(ab){y.abort(ab);};if(ak){for(ao=0;ao<M.length;ao++){C=i(M[ao]);if(j){C.prop("disabled",false);}else{C.removeAttr("disabled");}}}r=i.extend(true,{},i.ajaxSettings,X);r.context=r.context||r;
n="jqFormIO"+(new Date().getTime());if(r.iframeTarget){z=i(r.iframeTarget);m=z.attr2("name");if(!m){z.attr2("name",n);}else{n=m;}}else{z=i('<iframe name="'+n+'" src="'+r.iframeSrc+'" />');z.css({position:"absolute",top:"-1000px",left:"-1000px"});}w=z[0];y={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(ad){var ac=(ad==="timeout"?"timeout":"aborted");
k("aborting upload... "+ac);this.aborted=1;try{if(w.contentWindow.document.execCommand){w.contentWindow.document.execCommand("Stop");}}catch(ab){}z.attr("src",r.iframeSrc);y.error=ac;if(r.error){r.error.call(r.context,y,ac,ad);}if(am){i.event.trigger("ajaxError",[y,r,ac]);}if(r.complete){r.complete.call(r.context,y,ac);
}}};am=r.global;if(am&&0===i.active++){i.event.trigger("ajaxStart");}if(am){i.event.trigger("ajaxSend",[y,r]);}if(r.beforeSend&&r.beforeSend.call(r.context,y,r)===false){if(r.global){i.active--;}H.reject();return H;}if(y.aborted){H.reject();return H;}x=B.clk;if(x){m=x.name;if(m&&!x.disabled){r.extraData=r.extraData||{};
r.extraData[m]=x.value;if(x.type=="image"){r.extraData[m+".x"]=B.clk_x;r.extraData[m+".y"]=B.clk_y;}}}var s=1;var v=2;function u(ab){var ac=null;try{if(ab.contentWindow){ac=ab.contentWindow.document;}}catch(ad){k("cannot get iframe.contentWindow document: "+ad);}if(ac){return ac;}try{ac=ab.contentDocument?ab.contentDocument:ab.document;
}catch(ad){k("cannot get iframe.contentDocument: "+ad);ac=ab.document;}return ac;}var D=i("meta[name=csrf-token]").attr("content");var E=i("meta[name=csrf-param]").attr("content");if(E&&D){r.extraData=r.extraData||{};r.extraData[E]=D;}function ap(){var ab=T.attr2("target"),af=T.attr2("action"),ah="multipart/form-data",ae=T.attr("enctype")||T.attr("encoding")||ah;
B.setAttribute("target",n);if(!Y||/post/i.test(Y)){B.setAttribute("method","POST");}if(af!=r.url){B.setAttribute("action",r.url);}if(!r.skipEncodingOverride&&(!Y||/post/i.test(Y))){T.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"});}if(r.timeout){t=setTimeout(function(){an=true;o(s);
},r.timeout);}function ad(){try{var aq=u(w).readyState;k("state = "+aq);if(aq&&aq.toLowerCase()=="uninitialized"){setTimeout(ad,50);}}catch(ar){k("Server abort: ",ar," (",ar.name,")");o(v);if(t){clearTimeout(t);}t=undefined;}}var ac=[];try{if(r.extraData){for(var at in r.extraData){if(r.extraData.hasOwnProperty(at)){if(i.isPlainObject(r.extraData[at])&&r.extraData[at].hasOwnProperty("name")&&r.extraData[at].hasOwnProperty("value")){ac.push(i('<input type="hidden" name="'+r.extraData[at].name+'">').val(r.extraData[at].value).appendTo(B)[0]);
}else{ac.push(i('<input type="hidden" name="'+at+'">').val(r.extraData[at]).appendTo(B)[0]);}}}}if(!r.iframeTarget){z.appendTo("body");}if(w.attachEvent){w.attachEvent("onload",o);}else{w.addEventListener("load",o,false);}setTimeout(ad,15);try{B.submit();}catch(ag){var au=document.createElement("form").submit;
au.apply(B);}}finally{B.setAttribute("action",af);B.setAttribute("enctype",ae);if(ab){B.setAttribute("target",ab);}else{T.removeAttr("target");}i(ac).remove();}}if(r.forceSync){ap();}else{setTimeout(ap,10);}var aj,ai,al=50,A;function o(af){if(y.aborted||A){return;}ai=u(w);if(!ai){k("cannot access response document");
af=v;}if(af===s&&y){y.abort("timeout");H.reject(y,"timeout");return;}else{if(af==v&&y){y.abort("server abort");H.reject(y,"error","server abort");return;}}if(!ai||ai.location.href==r.iframeSrc){if(!an){return;}}if(w.detachEvent){w.detachEvent("onload",o);}else{w.removeEventListener("load",o,false);}var ah="success",ad;
try{if(an){throw"timeout";}var av=r.dataType=="xml"||ai.XMLDocument||i.isXMLDoc(ai);k("isXml="+av);if(!av&&window.opera&&(ai.body===null||!ai.body.innerHTML)){if(--al){k("requeing onLoad callback, DOM not available");setTimeout(o,250);return;}}var ac=ai.body?ai.body:ai.documentElement;y.responseText=ac?ac.innerHTML:null;
y.responseXML=ai.XMLDocument?ai.XMLDocument:ai;if(av){r.dataType="xml";}y.getResponseHeader=function(aq){var ar={"content-type":r.dataType};return ar[aq.toLowerCase()];};if(ac){y.status=Number(ac.getAttribute("status"))||y.status;y.statusText=ac.getAttribute("statusText")||y.statusText;}var ay=(r.dataType||"").toLowerCase();
var ae=/(json|script|text)/.test(ay);if(ae||r.textarea){var ag=ai.getElementsByTagName("textarea")[0];if(ag){y.responseText=ag.value;y.status=Number(ag.getAttribute("status"))||y.status;y.statusText=ag.getAttribute("statusText")||y.statusText;}else{if(ae){var ax=ai.getElementsByTagName("pre")[0];var ab=ai.getElementsByTagName("body")[0];
if(ax){y.responseText=ax.textContent?ax.textContent:ax.innerText;}else{if(ab){y.responseText=ab.textContent?ab.textContent:ab.innerText;}}}}}else{if(ay=="xml"&&!y.responseXML&&y.responseText){y.responseXML=p(y.responseText);}}try{aj=G(y,ay,r);}catch(aw){ah="parsererror";y.error=ad=(aw||ah);}}catch(aw){k("error caught: ",aw);
ah="error";y.error=ad=(aw||ah);}if(y.aborted){k("upload aborted");ah=null;}if(y.status){ah=(y.status>=200&&y.status<300||y.status===304)?"success":"error";}if(ah==="success"){if(r.success){r.success.call(r.context,aj,"success",y);}H.resolve(y.responseText,"success",y);if(am){i.event.trigger("ajaxSuccess",[y,r]);
}}else{if(ah){if(ad===undefined){ad=y.statusText;}if(r.error){r.error.call(r.context,y,ah,ad);}H.reject(y,"error",ad);if(am){i.event.trigger("ajaxError",[y,r,ad]);}}}if(am){i.event.trigger("ajaxComplete",[y,r]);}if(am&&!--i.active){i.event.trigger("ajaxStop");}if(r.complete){r.complete.call(r.context,y,ah);
}A=true;if(r.timeout){clearTimeout(t);}setTimeout(function(){if(!r.iframeTarget){z.remove();}else{z.attr("src",r.iframeSrc);}y.responseXML=null;},100);}var p=i.parseXML||function(ac,ab){if(window.ActiveXObject){ab=new ActiveXObject("Microsoft.XMLDOM");ab.async="false";ab.loadXML(ac);}else{ab=(new DOMParser()).parseFromString(ac,"text/xml");
}return(ab&&ab.documentElement&&ab.documentElement.nodeName!="parsererror")?ab:null;};var F=i.parseJSON||function(ab){return window["eval"]("("+ab+")");};var G=function(ab,ad,ae){var af=ab.getResponseHeader("content-type")||"",ag=ad==="xml"||!ad&&af.indexOf("xml")>=0,ac=ag?ab.responseXML:ab.responseText;
if(ag&&ac.documentElement.nodeName==="parsererror"){if(i.error){i.error("parsererror");}}if(ae&&ae.dataFilter){ac=ae.dataFilter(ac,ad);}if(typeof ac==="string"){if(ad==="json"||!ad&&af.indexOf("json")>=0){ac=F(ac);}else{if(ad==="script"||!ad&&af.indexOf("javascript")>=0){i.globalEval(ac);}}}return ac;
};return H;}};i.fn.ajaxForm=function(b){b=b||{};b.delegation=b.delegation&&i.isFunction(i.fn.on);if(!b.delegation&&this.length===0){var a={s:this.selector,c:this.context};if(!i.isReady&&a.s){k("DOM not ready, queuing ajaxForm");i(function(){i(a.s,a.c).ajaxForm(b);});return this;}k("terminating; zero elements found by selector"+(i.isReady?"":" (DOM not ready)"));
return this;}if(b.delegation){i(document).off("submit.form-plugin",this.selector,g).off("click.form-plugin",this.selector,h).on("submit.form-plugin",this.selector,b,g).on("click.form-plugin",this.selector,b,h);return this;}return this.ajaxFormUnbind().bind("submit.form-plugin",b,g).bind("click.form-plugin",b,h);
};function g(a){var b=a.data;if(!a.isDefaultPrevented()){a.preventDefault();i(a.target).ajaxSubmit(b);}}function h(b){var c=b.target;var e=i(c);if(!(e.is("[type=submit],[type=image]"))){var f=e.closest("[type=submit]");if(f.length===0){return;}c=f[0];}var d=this;d.clk=c;if(c.type=="image"){if(b.offsetX!==undefined){d.clk_x=b.offsetX;
d.clk_y=b.offsetY;}else{if(typeof i.fn.offset=="function"){var a=e.offset();d.clk_x=b.pageX-a.left;d.clk_y=b.pageY-a.top;}else{d.clk_x=b.pageX-c.offsetLeft;d.clk_y=b.pageY-c.offsetTop;}}}setTimeout(function(){d.clk=d.clk_x=d.clk_y=null;},100);}i.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin");
};i.fn.formToArray=function(F,C){var G=[];if(this.length===0){return G;}var n=this[0];var D=this.attr("id");var b=F?n.getElementsByTagName("*"):n.elements;var e;if(b&&!/MSIE [678]/.test(navigator.userAgent)){b=i(b).get();}if(D){e=i(':input[form="'+D+'"]').get();if(e.length){b=(b||[]).concat(e);}}if(!b||!b.length){return G;
}var a,c,d,E,f,I,v;for(a=0,I=b.length;a<I;a++){f=b[a];d=f.name;if(!d||f.disabled){continue;}if(F&&n.clk&&f.type=="image"){if(n.clk==f){G.push({name:d,value:i(f).val(),type:f.type});G.push({name:d+".x",value:n.clk_x},{name:d+".y",value:n.clk_y});}continue;}E=i.fieldValue(f,true);if(E&&E.constructor==Array){if(C){C.push(f);
}for(c=0,v=E.length;c<v;c++){G.push({name:d,value:E[c]});}}else{if(l.fileapi&&f.type=="file"){if(C){C.push(f);}var B=f.files;if(B.length){for(c=0;c<B.length;c++){G.push({name:d,value:B[c],type:f.type});}}else{G.push({name:d,value:"",type:f.type});}}else{if(E!==null&&typeof E!="undefined"){if(C){C.push(f);
}G.push({name:d,value:E,type:f.type,required:f.required});}}}}if(!F&&n.clk){var J=i(n.clk),H=J[0];d=H.name;if(d&&!H.disabled&&H.type=="image"){G.push({name:d,value:J.val()});G.push({name:d+".x",value:n.clk_x},{name:d+".y",value:n.clk_y});}}return G;};i.fn.formSerialize=function(a){return i.param(this.formToArray(a));
};i.fn.fieldSerialize=function(a){var b=[];this.each(function(){var c=this.name;if(!c){return;}var e=i.fieldValue(this,a);if(e&&e.constructor==Array){for(var d=0,f=e.length;d<f;d++){b.push({name:c,value:e[d]});}}else{if(e!==null&&typeof e!="undefined"){b.push({name:this.name,value:e});}}});return i.param(b);
};i.fn.fieldValue=function(a){for(var b=[],d=0,f=this.length;d<f;d++){var c=this[d];var e=i.fieldValue(c,a);if(e===null||typeof e=="undefined"||(e.constructor==Array&&!e.length)){continue;}if(e.constructor==Array){i.merge(b,e);}else{b.push(e);}}return b;};i.fieldValue=function(x,d){var t=x.name,z=x.type,y=x.tagName.toLowerCase();
if(d===undefined){d=true;}if(d&&(!t||x.disabled||z=="reset"||z=="button"||(z=="checkbox"||z=="radio")&&!x.checked||(z=="submit"||z=="image")&&x.form&&x.form.clk!=x||y=="select"&&x.selectedIndex==-1)){return null;}if(y=="select"){var c=x.selectedIndex;if(c<0){return null;}var a=[],v=x.options;var f=(z=="select-one");
var b=(f?c+1:v.length);for(var n=(f?c:0);n<b;n++){var e=v[n];if(e.selected){var A=e.value;if(!A){A=(e.attributes&&e.attributes.value&&!(e.attributes.value.specified))?e.text:e.value;}if(f){return A;}a.push(A);}}return a;}return i(x).val();};i.fn.clearForm=function(a){return this.each(function(){i("input,select,textarea",this).clearFields(a);
});};i.fn.clearFields=i.fn.clearInputs=function(b){var a=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var c=this.type,d=this.tagName.toLowerCase();if(a.test(c)||d=="textarea"){this.value="";}else{if(c=="checkbox"||c=="radio"){this.checked=false;
}else{if(d=="select"){this.selectedIndex=-1;}else{if(c=="file"){if(/MSIE/.test(navigator.userAgent)){i(this).replaceWith(i(this).clone(true));}else{i(this).val("");}}else{if(b){if((b===true&&/hidden/.test(c))||(typeof b=="string"&&i(this).is(b))){this.value="";}}}}}}});};i.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset();
}});};i.fn.enable=function(a){if(a===undefined){a=true;}return this.each(function(){this.disabled=!a;});};i.fn.selected=function(a){if(a===undefined){a=true;}return this.each(function(){var c=this.type;if(c=="checkbox"||c=="radio"){this.checked=a;}else{if(this.tagName.toLowerCase()=="option"){var b=i(this).parent("select");
if(a&&b[0]&&b[0].type=="select-one"){b.find("option").selected(false);}this.selected=a;}}});};i.fn.ajaxSubmit.debug=false;function k(){if(!i.fn.ajaxSubmit.debug){return;}var a="[jquery.form] "+Array.prototype.join.call(arguments,"");if(window.console&&window.console.log){window.console.log(a);}else{if(window.opera&&window.opera.postError){window.opera.postError(a);
}}}}));