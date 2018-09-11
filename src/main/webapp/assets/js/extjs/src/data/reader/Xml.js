Ext.define("Ext.data.reader.Xml",{alternateClassName:"Ext.data.XmlReader",extend:"Ext.data.reader.Reader",alias:"reader.xml",requires:["Ext.dom.Query"],config:{record:"",namespace:""},createAccessor:function(a){if(Ext.isEmpty(a)){return Ext.emptyFn;}if(Ext.isFunction(a)){return a;}return function(b){return this.getNodeValue(Ext.DomQuery.selectNode(a,b));
};},getNodeValue:function(a){if(a){if(typeof a.normalize==="function"){a.normalize();}a=a.firstChild;if(a){return a.nodeValue;}}return undefined;},getResponseData:function(a){var c=a.responseXML,b="XML data not found in the response";if(!c){Ext.Logger.warn(b);return this.createReadError(b);}return c;
},getData:function(a){return a.documentElement||a;},getRoot:function(a){return this.getRootValue(a,this.getRootProperty());},extractData:function(a,b){var c=this.getRecord();if(!c){Ext.raise("Record is a required parameter");}if(c!==a.nodeName){a=Ext.DomQuery.select(c,a);}else{a=[a];}return this.callParent([a,b]);
},readRecords:function(c,b,a){if(Ext.isArray(c)){c=c[0];}return this.callParent([c,b,a]);},createFieldAccessor:function(e){var d=this.getNamespace(),c,b,a;if(e.mapping){c=e.mapping;}else{c=(d?d+"|":"")+e.name;b=true;}if(typeof c==="function"){a=function(g,f){return e.mapping(g,f);};}else{if(b&&!d){if(Ext.isIE9m){a=function(g,f){return f.getNodeValue(g.selectSingleNode(c));
};}else{if(Ext.supports.XmlQuerySelector){a=function(g,f){return f.getNodeValue(g.querySelector(c));};}}}if(!a){a=function(g,f){return f.getNodeValue(Ext.DomQuery.selectNode(c,g));};}}return a;},privates:{getGroupRoot:function(a){return this.getRootValue(a,this.getGroupRootProperty());},getRootValue:function(a,c){var b=a.nodeName;
if(!c||(b&&b==c)){return a;}else{if(typeof c==="function"){return c(a);}else{if(Ext.DomQuery.isXml(a)){return Ext.DomQuery.selectNode(c,a);}}}},getSummaryRoot:function(a){return this.getRootValue(a,this.getSummaryRootProperty());}},deprecated:{"5.1.1":{properties:{xmlData:null}}}});