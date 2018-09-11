Ext.define("Ext.direct.Manager",{singleton:true,requires:["Ext.util.MixedCollection"],mixins:["Ext.mixin.Observable"],exceptions:{TRANSPORT:"xhr",PARSE:"parse",DATA:"data",LOGIN:"login",SERVER:"exception"},providerClasses:{},remotingMethods:{},config:{varName:"Ext.REMOTING_API"},apiNotFoundError:"Ext Direct API was not found at {0}",constructor:function(){var a=this;
a.mixins.observable.constructor.call(a);a.transactions=new Ext.util.MixedCollection();a.providers=new Ext.util.MixedCollection();},addProvider:function(f){var d=this,b=arguments,e=d.relayers||(d.relayers={}),c,a;if(b.length>1){for(c=0,a=b.length;c<a;++c){d.addProvider(b[c]);}return;}if(!f.isProvider){f=Ext.create("direct."+f.type+"provider",f);
}d.providers.add(f);f.on("data",d.onProviderData,d);if(f.relayedEvents){e[f.id]=d.relayEvents(f,f.relayedEvents);}if(!f.isConnected()){f.connect();}return f;},loadProvider:function(b,k,l){var g=this,c=g.providerClasses,h,a,d,j,e,f;if(Ext.isArray(b)){for(e=0,f=b.length;e<f;e++){g.loadProvider(b[e],k,l);
}return;}h=b.type;a=b.url;if(c[h]&&c[h].checkConfig(b)){j=g.addProvider(b);g.fireEventArgs("providerload",[a,j]);Ext.callback(k,l,[a,j]);return;}d=b.varName||g.getVarName();delete b.varName;if(!a){Ext.raise("Need API discovery URL to load a Remoting provider!");}delete b.url;Ext.Loader.loadScript({url:a,scope:g,onLoad:function(){this.onApiLoadSuccess({url:a,varName:d,config:b,callback:k,scope:l});
},onError:function(){this.onApiLoadFailure({url:a,callback:k,scope:l});}});},getProvider:function(a){return a.isProvider?a:this.providers.get(a);},removeProvider:function(d){var b=this,a=b.providers,c=b.relayers,e;d=d.isProvider?d:a.get(d);if(d){d.un("data",b.onProviderData,b);e=d.id;if(c[e]){c[e].destroy();
delete c[e];}a.remove(d);return d;}return null;},addTransaction:function(a){this.transactions.add(a);return a;},removeTransaction:function(b){var a=this;b=a.getTransaction(b);a.transactions.remove(b);return b;},getTransaction:function(a){return typeof a==="object"?a:this.transactions.get(a);},onProviderData:function(e,d){var c=this,b,a;
if(Ext.isArray(d)){for(b=0,a=d.length;b<a;++b){c.onProviderData(e,d[b]);}return;}if(d.name&&d.name!=="event"&&d.name!=="exception"){c.fireEvent(d.name,d);}else{if(d.status===false){c.fireEvent("exception",d);}}c.fireEvent("event",d,e);},parseMethod:function(d){var f=Ext.global,c=0,b,e,a;if(Ext.isFunction(d)){b=d;
}else{if(Ext.isString(d)){b=this.remotingMethods[d];if(!b){e=d.split(".");a=e.length;while(f&&c<a){f=f[e[c]];++c;}b=Ext.isFunction(f)?f:null;}}}return b||null;},resolveApi:function(c,a){var e,d,g,f,b;e=c&&c.prefix;if(e&&e.substr(e.length-1)!=="."){e+=".";}for(d in c){g=c[d];if(d!=="prefix"&&typeof g!=="function"){f=(e||"")+g;
b=this.parseMethod(f);if(typeof b==="function"){c[d]=b;}else{Ext.raise("Cannot resolve Direct API method '"+f+"' for "+d+" action in "+a.$className+" instance with id: "+(a.id!=null?a.id:"unknown"));}}}return c;},privates:{addProviderClass:function(b,a){this.providerClasses[b]=a;},onApiLoadSuccess:function(options){var me=this,url=options.url,varName=options.varName,api,provider,error;
try{api=Ext.apply(options.config,eval(varName));provider=me.addProvider(api);}catch(e){error=e+"";}if(error){me.fireEventArgs("providerloaderror",[url,error]);Ext.callback(options.callback,options.scope,[url,error]);}else{me.fireEventArgs("providerload",[url,provider]);Ext.callback(options.callback,options.scope,[url,provider]);
}},onApiLoadFailure:function(c){var b=c.url,a;a=Ext.String.format(this.apiNotFoundError,b);this.fireEventArgs("providerloaderror",[b,a]);Ext.callback(c.callback,c.scope,[b,a]);},registerMethod:function(a,b){this.remotingMethods[a]=b;},clearAllMethods:function(){this.remotingMethods={};}}},function(){Ext.Direct=Ext.direct.Manager;
});