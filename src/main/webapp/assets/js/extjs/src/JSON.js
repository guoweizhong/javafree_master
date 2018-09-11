Ext.USE_NATIVE_JSON=false;Ext.JSON=(new (function(){var me=this,hasNative=window.JSON&&JSON.toString()==="[object JSON]",useHasOwn=!!{}.hasOwnProperty,pad=function(n){return n<10?"0"+n:n;},doDecode=function(json){return eval("("+json+")");},doEncode=function(o,newline){if(o===null||o===undefined){return"null";
}else{if(Ext.isDate(o)){return me.encodeDate(o);}else{if(Ext.isString(o)){if(Ext.isMSDate(o)){return me.encodeMSDate(o);}else{return me.encodeString(o);}}else{if(typeof o==="number"){return isFinite(o)?String(o):"null";}else{if(Ext.isBoolean(o)){return String(o);}else{if(o.toJSON){return o.toJSON();}else{if(Ext.isArray(o)){return encodeArray(o,newline);
}else{if(Ext.isObject(o)){return encodeObject(o,newline);}else{if(typeof o==="function"){return"null";}}}}}}}}}return"undefined";},m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\","\x0b":"\\u000b"},charToReplace=/[\\\"\x00-\x1f\x7f-\uffff]/g,encodeString=function(s){return'"'+s.replace(charToReplace,function(a){var c=m[a];
return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4);})+'"';},encodeMSDate=function(o){return'"'+o+'"';},encodeArrayPretty=function(o,newline){var len=o.length,cnewline=newline+"   ",sep=","+cnewline,a=["[",cnewline],i;for(i=0;i<len;i+=1){a.push(me.encodeValue(o[i],cnewline),sep);
}a[a.length-1]=newline+"]";return a.join("");},encodeObjectPretty=function(o,newline){var cnewline=newline+"   ",sep=","+cnewline,a=["{",cnewline],i,val;for(i in o){val=o[i];if(!useHasOwn||o.hasOwnProperty(i)){if(typeof val==="function"||val===undefined||val.isInstance){continue;}a.push(me.encodeValue(i)+": "+me.encodeValue(val,cnewline),sep);
}}a[a.length-1]=newline+"}";return a.join("");},encodeArray=function(o,newline){if(newline){return encodeArrayPretty(o,newline);}var a=["[",""],len=o.length,i;for(i=0;i<len;i+=1){a.push(me.encodeValue(o[i]),",");}a[a.length-1]="]";return a.join("");},encodeObject=function(o,newline){if(newline){return encodeObjectPretty(o,newline);
}var a=["{",""],i,val;for(i in o){val=o[i];if(!useHasOwn||o.hasOwnProperty(i)){if(typeof val==="function"||val===undefined){continue;}a.push(me.encodeValue(i),":",me.encodeValue(val),",");}}a[a.length-1]="}";return a.join("");};me.encodeString=encodeString;me.encodeValue=doEncode;me.encodeDate=function(o){return'"'+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+'"';
};me.encode=function(o){if(hasNative&&Ext.USE_NATIVE_JSON){return JSON.stringify(o);}return me.encodeValue(o);};me.decode=function(json,safe){try{if(hasNative&&Ext.USE_NATIVE_JSON){return JSON.parse(json);}return doDecode(json);}catch(e){if(safe){return null;}Ext.raise({sourceClass:"Ext.JSON",sourceMethod:"decode",msg:"You're trying to decode an invalid JSON String: "+json});
}};me.encodeMSDate=encodeMSDate;if(!Ext.util){Ext.util={};}Ext.util.JSON=me;Ext.encode=me.encode;Ext.decode=me.decode;})());