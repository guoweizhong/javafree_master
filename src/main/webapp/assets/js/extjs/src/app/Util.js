Ext.define("Ext.app.Util",{},function(){Ext.apply(Ext.app,{namespaces:{Ext:{}},addNamespaces:function(c){var d=Ext.app.namespaces,b,a;if(!Ext.isArray(c)){c=[c];}for(b=0,a=c.length;b<a;b++){d[c[b]]=true;}},clearNamespaces:function(){Ext.app.namespaces={};},getNamespace:function(b){var d=Ext.apply({},Ext.ClassManager.paths,Ext.app.namespaces),a="",c;
for(c in d){if(d.hasOwnProperty(c)&&c.length>a.length&&(c+"."===b.substring(0,c.length+1))){a=c;}}return a===""?undefined:a;},setupPaths:function(a,b,e){var d=Ext.manifest,c;if(a&&b!==null){d=d&&d.paths;if(!d||b!==undefined){Ext.Loader.setPath(a,(b===undefined)?"app":b);}}if(e){for(c in e){if(e.hasOwnProperty(c)){Ext.Loader.setPath(c,e[c]);
}}}}});Ext.getNamespace=Ext.app.getNamespace;});