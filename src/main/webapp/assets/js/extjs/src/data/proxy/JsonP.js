Ext.define("Ext.data.proxy.JsonP",{extend:"Ext.data.proxy.Server",alternateClassName:"Ext.data.ScriptTagProxy",alias:["proxy.jsonp","proxy.scripttag"],requires:["Ext.data.JsonP"],config:{callbackKey:"callback",recordParam:"records",autoAppendParams:true},doRequest:function(a){var c=this,b=c.buildRequest(a),d=b.getParams();
b.setConfig({callbackKey:c.callbackKey,timeout:c.timeout,scope:c,disableCaching:false,callback:c.createRequestCallback(b,a)});if(c.getAutoAppendParams()){b.setParams({});}b.setRawRequest(Ext.data.JsonP.request(b.getCurrentConfig()));b.setParams(d);c.lastRequest=b;return b;},createRequestCallback:function(c,a){var b=this;
return function(f,d,e){if(c===b.lastRequest){b.lastRequest=null;}b.processResponse(f,a,c,d);};},setException:function(b,a){b.setException(b.getRequest().getRawRequest().errorType);},buildUrl:function(g){var j=this,a=j.callParent(arguments),d=g.getRecords(),e=j.getWriter(),f,c,b,h,k;if(e&&g.getOperation().allowWrite()){g=e.write(g);
}f=g.getParams();c=f.filters;delete f.filters;if(c&&c.length){for(h=0;h<c.length;h++){b=c[h];k=b.getValue();if(k){f[b.getProperty()]=k;}}}if(Ext.isArray(d)&&d.length>0&&(!e||!e.getEncode())){f[j.getRecordParam()]=j.encodeRecords(d);}if(j.getAutoAppendParams()){a=Ext.urlAppend(a,Ext.Object.toQueryString(f));
}return a;},abort:function(a){a=a||this.lastRequest;if(a){Ext.data.JsonP.abort(a.getRawRequest());}},encodeRecords:function(b){var d=[],c=0,a=b.length;for(;c<a;c++){d.push(Ext.encode(b[c].getData()));}return d;}});