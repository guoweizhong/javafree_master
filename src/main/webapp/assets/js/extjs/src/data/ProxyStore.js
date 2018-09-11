Ext.define("Ext.data.ProxyStore",{extend:"Ext.data.AbstractStore",requires:["Ext.data.Model","Ext.data.proxy.Proxy","Ext.data.proxy.Memory","Ext.data.operation.*"],config:{model:undefined,fields:null,proxy:undefined,autoLoad:undefined,autoSync:false,batchUpdateMode:"operation",sortOnLoad:true,trackRemoved:true,asynchronousLoad:undefined},onClassExtended:function(b,d,a){var c=d.model,e;
if(typeof c==="string"){e=a.onBeforeCreated;a.onBeforeCreated=function(){var g=this,f=arguments;Ext.require(c,function(){e.apply(g,f);});};}},implicitModel:"Ext.data.Model",autoSyncSuspended:0,removed:null,constructor:function(b){var d=this;var c=d.model;d.callParent(arguments);if(d.getAsynchronousLoad()===false){d.flushLoad();
}if(!d.getModel()&&d.useModelWarning!==false&&d.getStoreId()!=="ext-empty-store"){var a=[Ext.getClassName(d)||"Store"," created with no model."];if(typeof c==="string"){a.push(" The name '",c,"'"," does not correspond to a valid model.");}Ext.log.warn(a.join(""));}},doDestroy:function(){var b=this,a=b.getProxy();
b.clearLoadTask();Ext.destroy(b.getData());b.data=null;b.setProxy(null);if(a.autoCreated){a.destroy();}b.setModel(null);b.callParent();},applyAsynchronousLoad:function(a){if(a==null){a=!this.loadsSynchronously();}return a;},updateAutoLoad:function(a){this.getData();if(a){this.load(Ext.isObject(a)?a:undefined);
}},getTotalCount:function(){return this.totalCount||0;},applyFields:function(a){if(a){this.createImplicitModel(a);}},applyModel:function(a){if(a){a=Ext.data.schema.Schema.lookupEntity(a);}else{if(!this.destroying){this.getFields();a=this.getModel()||this.createImplicitModel();}}return a;},applyProxy:function(b){var a=this.getModel();
if(b!==null){if(b){if(b.isProxy){b.setModel(a);}else{if(Ext.isString(b)){b={type:b,model:a};}else{if(!b.model){b=Ext.apply({model:a},b);}}b=Ext.createByAlias("proxy."+b.type,b);b.autoCreated=true;}}else{if(a){b=a.getProxy();this.useModelProxy=true;}}if(!b){b=Ext.createByAlias("proxy.memory");b.autoCreated=true;
}}return b;},applyState:function(b){var a=this;a.callParent([b]);if(a.getAutoLoad()||a.isLoaded()){a.load();}},updateProxy:function(b,a){this.proxyListeners=Ext.destroy(this.proxyListeners);},updateTrackRemoved:function(a){this.cleanRemoved();this.removed=a?[]:null;},onMetaChange:function(a,b){this.fireEvent("metachange",this,b);
},create:function(e,c){var d=this,f=d.getModel(),a=new f(e),b;c=Ext.apply({},c);if(!c.records){c.records=[a];}c.internalScope=d;c.internalCallback=d.onProxyWrite;b=d.createOperation("create",c);return b.execute();},read:function(){return this.load.apply(this,arguments);},update:function(b){var c=this,a;
b=Ext.apply({},b);if(!b.records){b.records=c.getUpdatedRecords();}b.internalScope=c;b.internalCallback=c.onProxyWrite;a=c.createOperation("update",b);return a.execute();},onProxyWrite:function(b){var c=this,d=b.wasSuccessful(),a=b.getRecords();switch(b.getAction()){case"create":c.onCreateRecords(a,b,d);
break;case"update":c.onUpdateRecords(a,b,d);break;case"destroy":c.onDestroyRecords(a,b,d);break;}if(d){c.fireEvent("write",c,b);c.fireEvent("datachanged",c);}},onCreateRecords:Ext.emptyFn,onUpdateRecords:Ext.emptyFn,onDestroyRecords:function(b,a,c){if(c){this.cleanRemoved();}},erase:function(b){var c=this,a;
b=Ext.apply({},b);if(!b.records){b.records=c.getRemovedRecords();}b.internalScope=c;b.internalCallback=c.onProxyWrite;a=c.createOperation("destroy",b);return a.execute();},onBatchOperationComplete:function(b,a){return this.onProxyWrite(a);},onBatchComplete:function(c,a){var f=this,b=c.operations,e=b.length,d;
if(f.batchUpdateMode!=="operation"){f.suspendEvents();for(d=0;d<e;d++){f.onProxyWrite(b[d]);}f.resumeEvents();}f.isSyncing=false;f.fireEvent("datachanged",f);},onBatchException:function(b,a){},filterNew:function(a){return a.phantom&&a.isValid();},getNewRecords:function(){return[];},getUpdatedRecords:function(){return[];
},getModifiedRecords:function(){return[].concat(this.getNewRecords(),this.getUpdatedRecords());},filterUpdated:function(a){return a.dirty&&!a.phantom&&a.isValid();},getRemovedRecords:function(){var a=this.getRawRemovedRecords();return a?Ext.Array.clone(a):[];},sync:function(c){var e=this,b={},f=e.getNewRecords(),d=e.getUpdatedRecords(),a=e.getRemovedRecords(),g=false;
if(e.isSyncing){Ext.log.warn("Sync called while a sync operation is in progress. Consider configuring autoSync as false.");}e.needsSync=false;if(f.length>0){b.create=f;g=true;}if(d.length>0){b.update=d;g=true;}if(a.length>0){b.destroy=a;g=true;}if(g&&e.fireEvent("beforesync",b)!==false){e.isSyncing=true;
c=c||{};e.proxy.batch(Ext.apply(c,{operations:b,listeners:e.getBatchListeners()}));}return e;},getBatchListeners:function(){var b=this,a={scope:b,exception:b.onBatchException,complete:b.onBatchComplete};if(b.batchUpdateMode==="operation"){a.operationcomplete=b.onBatchOperationComplete;}return a;},save:function(){return this.sync.apply(this,arguments);
},load:function(a){var b=this;if(typeof a==="function"){a={callback:a};}else{a=a?Ext.Object.chain(a):{};}b.pendingLoadOptions=a;if(b.getAsynchronousLoad()){if(!b.loadTimer){b.loadTimer=Ext.asap(b.flushLoad,b);}}else{b.flushLoad();}return b;},flushLoad:function(){var c=this,b=c.pendingLoadOptions,a;if(c.destroying||c.destroyed){return;
}c.clearLoadTask();if(!b){return;}c.setLoadOptions(b);if(c.getRemoteSort()&&b.sorters){c.fireEvent("beforesort",c,b.sorters);}a=Ext.apply({internalScope:c,internalCallback:c.onProxyLoad,scope:c},b);c.lastOptions=a;a=c.createOperation("read",a);if(c.fireEvent("beforeload",c,a)!==false){c.onBeforeLoad(a);
c.loading=true;a.execute();}},reload:function(a){return this.load(Ext.apply({},a,this.lastOptions));},onEndUpdate:function(){var a=this;if(a.needsSync&&a.autoSync&&!a.autoSyncSuspended){a.sync();}},afterReject:function(a){var b=this;if(b.contains(a)){b.onUpdate(a,Ext.data.Model.REJECT,null);b.fireEvent("update",b,a,Ext.data.Model.REJECT,null);
b.fireEvent("datachanged",b);}},afterCommit:function(a,c){var b=this;if(!c){c=null;}if(b.contains(a)){b.onUpdate(a,Ext.data.Model.COMMIT,c);b.fireEvent("update",b,a,Ext.data.Model.COMMIT,c);b.fireEvent("datachanged",b);}},afterErase:function(a){this.onErase(a);},onErase:Ext.emptyFn,onUpdate:Ext.emptyFn,hasPendingLoad:function(){return !!this.pendingLoadOptions||this.isLoading();
},isLoading:function(){return !!this.loading;},isLoaded:function(){return this.loadCount>0;},suspendAutoSync:function(){++this.autoSyncSuspended;},resumeAutoSync:function(b){var a=this;if(!a.autoSyncSuspended){Ext.log.warn("Mismatched call to resumeAutoSync - auto synchronization is currently not suspended.");
}if(a.autoSyncSuspended&&!--a.autoSyncSuspended){if(b){a.sync();}}},removeAll:Ext.emptyFn,clearData:Ext.emptyFn,privates:{getRawRemovedRecords:function(){return this.removed;},onExtraParamsChanged:function(){},clearLoadTask:function(){if(this.loadTimer){Ext.asapCancel(this.loadTimer);}this.pendingLoadOptions=this.loadTimer=null;
},cleanRemoved:function(){var c=this.getRawRemovedRecords(),a,b;if(c){for(b=0,a=c.length;b<a;++b){c[b].unjoin(this);}c.length=0;}},createOperation:function(d,a){var e=this,b=e.getProxy(),c;if(!e.proxyListeners){c={scope:e,destroyable:true,beginprocessresponse:e.beginUpdate,endprocessresponse:e.endUpdate};
if(!e.disableMetaChangeEvent){c.metachange=e.onMetaChange;}e.proxyListeners=b.on(c);}return b.createOperation(d,a);},createImplicitModel:function(a){var e=this,b={extend:e.implicitModel,statics:{defaultProxy:"memory"}},d,c;if(a){b.fields=a;}c=Ext.define(null,b);e.setModel(c);d=e.getProxy();if(d){c.setProxy(d);
}else{e.setProxy(c.getProxy());}},loadsSynchronously:function(){return this.getProxy().isSynchronous;},onBeforeLoad:Ext.privateFn,removeFromRemoved:function(a){var b=this.getRawRemovedRecords();if(b){Ext.Array.remove(b,a);a.unjoin(this);}},setLoadOptions:function(a){var c=this,b,d;if(c.getRemoteFilter()){b=c.getFilters(false);
if(b&&b.getCount()){a.filters=b.getRange();}}if(c.getRemoteSort()){d=c.getSorters(false);if(d&&d.getCount()){a.sorters=d.getRange();}}}}});