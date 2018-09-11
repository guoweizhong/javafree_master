Ext.define("Ext.data.ChainedStore",{extend:"Ext.data.AbstractStore",alias:"store.chained",config:{source:null,remoteFilter:false,remoteSort:false},mixins:["Ext.data.LocalStore"],updateRemoteFilter:function(a,b){if(a){Ext.raise("Remote filtering cannot be used with chained stores.");}this.callParent([a,b]);
},updateRemoteSort:function(b,a){if(b){Ext.raise("Remote sorting cannot be used with chained stores.");}this.callParent([b,a]);},remove:function(){var a=this.getSource();if(!a){Ext.raise("Cannot remove records with no source.");}return a.remove.apply(a,arguments);},removeAll:function(){var a=this.getSource();
if(!a){Ext.raise("Cannot remove records with no source.");}return a.removeAll();},getData:function(){var a=this,b=a.data;if(!b){a.data=b=a.constructDataCollection();}return b;},getTotalCount:function(){return this.getCount();},getSession:function(){return this.getSourceValue("getSession",null);},applySource:function(c){if(c){var a=c,b;
c=Ext.data.StoreManager.lookup(c);if(!c){b="Invalid source {0}specified for Ext.data.ChainedStore";b=Ext.String.format(b,typeof a==="string"?'"'+a+'" ':"");Ext.raise(b);}}return c;},updateSource:function(d,b){var a=this,c;if(b&&!b.destroyed){b.removeObserver(a);}if(d){c=a.getData();c.setSource(d.getData());
if(!a.isInitializing){a.fireEvent("refresh",a);a.fireEvent("datachanged",a);}d.addObserver(a);}},getModel:function(){return this.getSourceValue("getModel",null);},getProxy:function(){return null;},onCollectionAdd:function(d,c){var b=this,a=c.items,e=!c.next;if(b.ignoreCollectionAdd){return;}if(b.activeRanges){b.syncActiveRanges();
}b.fireEvent("add",b,a,c.at);if(e){b.fireEvent("datachanged",b);}},onCollectionItemChange:function(f,e){var d=this,a=e.item,c=e.modified||null,b=e.meta;d.onUpdate(a,b,c,e);d.fireEvent("update",d,a,b,c,e);d.fireEvent("datachanged",d);},onCollectionUpdateKey:function(b,a){this.fireEvent("idchanged",this,a.item,a.oldKey,a.newKey);
},onUpdate:Ext.emptyFn,onCollectionRemove:function(d,c){var b=this,a=c.items,e=!c.next;if(b.ignoreCollectionRemove){return;}b.fireEvent("remove",b,a,c.at,false);if(e){b.fireEvent("datachanged",b);}},onSourceBeforeLoad:function(b,a){this.fireEvent("beforeload",this,a);this.callObservers("BeforeLoad",[a]);
},onSourceAfterLoad:function(c,b,d,a){this.fireEvent("load",this,b,d,a);this.callObservers("AfterLoad",[b,d,a]);},onFilterEndUpdate:function(){this.callParent(arguments);this.callObservers("Filter");},onSourceBeforePopulate:function(){this.ignoreCollectionAdd=true;this.callObservers("BeforePopulate");
},onSourceAfterPopulate:function(){var a=this;a.ignoreCollectionAdd=false;a.fireEvent("datachanged",a);a.fireEvent("refresh",a);this.callObservers("AfterPopulate");},onSourceBeforeClear:function(){this.ignoreCollectionRemove=true;this.callObservers("BeforeClear");},onSourceAfterClear:function(){this.ignoreCollectionRemove=false;
this.callObservers("AfterClear");},onSourceBeforeRemoveAll:function(){this.ignoreCollectionRemove=true;this.callObservers("BeforeRemoveAll");},onSourceAfterRemoveAll:function(c,a){var b=this;b.ignoreCollectionRemove=false;if(!a){b.fireEvent("clear",b);b.fireEvent("datachanged",b);}this.callObservers("AfterRemoveAll",[a]);
},onSourceFilter:function(){var a=this;a.fireEvent("refresh",a);a.fireEvent("datachanged",a);},hasPendingLoad:function(){return this.getSourceValue("hasPendingLoad",false);},isLoaded:function(){return this.getSourceValue("isLoaded",false);},isLoading:function(){return this.getSourceValue("isLoading",false);
},doDestroy:function(){var a=this;a.observers=null;a.setSource(null);a.getData().destroy(true);a.data=null;a.callParent();},privates:{getSourceValue:function(d,a){var b=this.getSource(),c=a;if(b){c=b[d]();}return c;},isMoving:function(){var a=this.getSource();return a.isMoving?a.isMoving.apply(a,arguments):false;
},loadsSynchronously:function(){return this.getSource().loadsSynchronously();}}});