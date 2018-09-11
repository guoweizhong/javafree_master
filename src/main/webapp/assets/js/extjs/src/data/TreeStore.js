Ext.define("Ext.data.TreeStore",{extend:"Ext.data.Store",alias:"store.tree",requires:["Ext.util.Sorter","Ext.data.TreeModel","Ext.data.NodeInterface"],isTreeStore:true,config:{root:null,rootVisible:false,defaultRootProperty:"children",parentIdProperty:null,clearOnLoad:true,clearRemovedOnLoad:true,nodeParam:"node",defaultRootId:"root",defaultRootText:"Root",folderSort:false,pageSize:null},filterer:"topdown",lazyFill:false,fillCount:0,bulkUpdate:0,nodesToUnregister:0,_silentOptions:{silent:true},implicitModel:"Ext.data.TreeModel",constructor:function(a){var b=this;
b.byIdMap={};b.callParent([a]);if(Ext.isDefined(b.nodeParameter)){if(Ext.isDefined(Ext.global.console)){Ext.global.console.warn("Ext.data.TreeStore: nodeParameter has been deprecated. Please use nodeParam instead.");}b.nodeParam=b.nodeParameter;delete b.nodeParameter;}},applyFields:function(a,c){var b=this;
if(a){if(b.defaultRootProperty!==b.self.prototype.config.defaultRootProperty){a=a.concat({name:b.defaultRootProperty,type:"auto",defaultValue:null,persist:false});}}b.callParent([a,c]);},onSorterEndUpdate:function(){var c=this,a=c.getSorters(),d=a.getRange(),b=c.getRoot(),e=c.getFolderSort();c.fireEvent("beforesort",c,d);
if(b&&(e||d.length)){if(c.getRemoteSort()){if(d.length){c.load({callback:function(){c.fireEvent("sort",c,d);}});}}else{b.sort(this.getSortFn(),true);c.fireEvent("datachanged",c);c.fireEvent("refresh",c);c.fireEvent("sort",c,d);}}else{c.fireEvent("sort",c,d);}},updateFolderSort:function(a){this.needsFolderSort=a;
this.onSorterEndUpdate();},getSortFn:function(){return this._sortFn||(this._sortFn=this.createSortFn());},createSortFn:function(){var a=this,b=this.sorters.getSortFn();return function(e,d){var f,g,c=0;if(a.needsFolderSort){f=e.data.leaf?1:0;g=d.data.leaf?1:0;c=f-g;}if(a.needsIndexSort&&c===0){c=e.data.index-d.data.index;
}return c||b(e,d);};},getTotalCount:function(){return this.getCount();},afterEdit:function(a,b){var h=this,c=a.parentNode,i=h.getRootVisible(),e=!c&&!i,f,d=a.get("visible"),j,g;if(!e&&d!==h.contains(a)){if(d){if(!c||h.isVisible(a)){j=[a];if(a.isExpanded()){h.handleNodeExpand(a,a.childNodes,j);}f=a.previousSibling?h.indexOfPreviousVisibleNode(a.previousSibling):(c?h.indexOf(c):-1);
h.insert(f+1,j);}}else{g=h.indexOf(a);h.removeAt(g,h.indexOfNextVisibleNode(a)-g);}}else{if(h.getRoot()&&h.needsLocalFilter()){h.onFilterEndUpdate(h.getFilters());}}h.callParent([a,b]);},afterReject:function(a){var b=this;if(b.contains(a)){b.onUpdate(a,Ext.data.Model.REJECT,null);b.fireEvent("update",b,a,Ext.data.Model.REJECT,null);
}},afterCommit:function(a,c){var b=this;if(!c){c=null;}if(b.contains(a)){b.onUpdate(a,Ext.data.Model.COMMIT,c);b.fireEvent("update",b,a,Ext.data.Model.COMMIT,c);}},updateRootVisible:function(b){var a=this.getRoot(),c;if(a){c=this.getData();if(b){c.insert(0,a);}else{c.remove(a);}}},updateTrackRemoved:function(a){this.callParent(arguments);
this.removedNodes=this.removed;this.removed=null;},onDestroyRecords:function(b,a,c){if(c){this.removedNodes.length=0;}},updateProxy:function(b){var a;if(b){if(b.setIdParam){b.setIdParam(this.getNodeParam());}a=b.getReader();if(Ext.isEmpty(a.getRootProperty())){a.setRootProperty(this.getDefaultRootProperty());
}}},setProxy:function(a){this.changingProxy=true;this.callParent([a]);this.changingProxy=false;},updateModel:function(a){if(a){var b=a.prototype.isNode;Ext.data.NodeInterface.decorate(a);if(!b&&!this.changingProxy){this.getProxy().getReader().buildExtractors(true);}}},onCollectionFilter:Ext.emptyFn,onFilterEndUpdate:function(f){var e=this,d=f.length,a=e.getRoot(),h,c,g,b;
if(!e.getRemoteFilter()){if(d){e.doFilter(a);}else{a.cascade({after:function(i){i.set("visible",true,e._silentOptions);}});}if(d){g=[];h=a.childNodes;for(b=0,d=h.length;b<d;b++){c=h[b];if(c.get("visible")){g.push(c);}}}else{g=a.childNodes;}e.onNodeFilter(a,g);a.fireEvent("filterchange",a,g);e.suppressNextFilter=true;
e.callParent([f]);e.suppressNextFilter=false;}else{e.callParent([f]);}},onNodeFilter:function(a,e){var c=this,d=c.getData(),b=[];if(c.getRootVisible()&&a.get("visible")){b.push(a);}c.handleNodeExpand(a,e,b);c.suspendEvents();d.splice(0,d.getCount(),b);c.resumeEvents();if(!c.suppressNextFilter){c.fireEvent("datachanged",c);
c.fireEvent("refresh",c);}},onBeforeNodeExpand:function(b,j,k,f){var g=this,h,d,i,e,a,c;if(b.isLoaded()){c=[b.childNodes];if(f){c.push.apply(c,f);}Ext.callback(j,k||b,c);}else{if(b.isLoading()){g.on("load",function(){c=[b.childNodes];if(f){c.push.apply(c,f);}Ext.callback(j,k||b,c);},g,{single:true,priority:1001});
}else{h=g.getProxy().getReader();d=b.getProxy();i=d?d.getReader():null;e=i&&i.initialConfig.rootProperty?i:h;a=e.getRoot(b.raw||b.data);if(a||(b.phantom&&!b.isRoot())){if(a){g.fillNode(b,e.extractData(a,{model:b.childType,recordCreator:g.recordCreator}));}c=[b.childNodes];if(f){c.push.apply(c,f);}Ext.callback(j,k||b,c);
}else{g.read({node:b,onChildNodesAvailable:function(){delete g.lastOptions.onChildNodesAvailable;c=[b.childNodes];if(f){c.push.apply(c,f);}Ext.callback(j,k||b,c);}});g.flushLoad();}}}},onNodeExpand:function(d,b){var e=this,a=e.indexOf(d)+1,c=[];e.handleNodeExpand(d,b,c);if(!e.refreshCounter&&d.isRoot()&&!d.get("visible")){e.loadRecords(c);
}else{++e.loadCount;e.insert(a,c);}},handleNodeExpand:function(e,b,d){var g=this,f=b?b.length:0,c,a;if(e!==this.getRoot()&&!g.isVisible(e)){return;}if(f){for(c=0;c<f;c++){a=b[c];if(a.get("visible")){d.push(a);if(a.isExpanded()){if(a.isLoaded()){g.handleNodeExpand(a,a.childNodes,d);}else{a.set("expanded",false);
a.expand();}}}}}},onNodeCollapse:function(d,a,g,c){var e=this,b=e.indexOf(d)+1,f;if(e.needsLocalFilter()){a=Ext.Array.filter(a,e.filterVisible);}if(a.length&&e.isVisible(d)){f=e.indexOfNextVisibleNode(d);e.removeAt(b,f-b);}Ext.callback(g,c);},indexOfNextVisibleNode:function(b){var a;while(b.parentNode){for(a=b.nextSibling;
a&&!a.get("visible");a=a.nextSibling){}if(a){return this.indexOf(a);}b=b.parentNode;}return this.getCount();},indexOfPreviousVisibleNode:function(b){var a;for(a=b;a&&!a.get("visible");a=a.previousSibling){}if(a){if(a.isExpanded()&&a.lastChild){return this.indexOfPreviousVisibleNode(a.lastChild);}}else{a=b.parentNode;
}return this.indexOf(a);},filterNew:function(a){return !a.get("root")&&this.callParent([a]);},filterRejects:function(a){return !a.get("root")&&this.callParent([a]);},getNewRecords:function(){return Ext.Array.filter(Ext.Object.getValues(this.byIdMap),this.filterNew,this);},getRejectRecords:function(){return Ext.Array.filter(Ext.Object.getValues(this.byIdMap),this.filterRejects,this);
},getUpdatedRecords:function(){return Ext.Array.filter(Ext.Object.getValues(this.byIdMap),this.filterUpdated);},beforeNodeRemove:function(d,j,h,a){if(!Ext.isArray(j)){j=[j];}var g=this,f=j.length,e=g.removedNodes,c,b;for(c=0;!b&&c<f;c++){if(j[c].get("visible")){b=j[c];}}if(b){a[0]=g.indexOf(j[0]);a[1]=g.indexOfNextVisibleNode(j[j.length-1])-a[0];
}else{a[0]=-1;a[1]=0;}for(c=0;c<f;c++){j[c].cascade(function(i){g.unregisterNode(i,true);if(e&&!h){if(!i.phantom&&!i.erasing&&!g.loading){i.removedFrom=g.indexOf(i);e.push(i);g.needsSync=true;}}});}},afterDrop:Ext.emptyFn,onNodeRemove:function(a,e,b,c){var d=this;d.suspendAutoSync();if(c[0]!==-1){d.removeIsMove=b;
d.removeAt.apply(d,c);d.removeIsMove=false;}d.resumeAutoSync();},onNodeAppend:function(b,c,a){this.onNodeInsert(b,c,a);},onNodeInsert:function(l,a,f){var g=this,c=a.raw||a.data,e=g.removedNodes,h,b,i,d,k,j;if(l&&g.needsLocalFilter()){g.doFilter(l);}g.beginUpdate();if(g.isVisible(a)){if(f===0||!a.previousSibling){j=g.indexOf(l);
}else{j=g.indexOfPreviousVisibleNode(a.previousSibling);}g.insert(j+1,a);if(!a.isLeaf()&&a.isExpanded()){if(a.isLoaded()){g.onNodeExpand(a,a.childNodes);}else{if(!g.fillCount){a.set("expanded",false);a.expand();}}}}Ext.Array.remove(e,a);g.needsSync=g.needsSync||a.phantom||a.dirty;if(!a.isLeaf()&&!a.isLoaded()&&!g.lazyFill){h=g.getProxy().getReader();
b=a.getProxy();i=b?b.getReader():null;d=i&&i.initialConfig.rootProperty?i:h;k=d.getRoot(c);if(k){g.fillNode(a,d.extractData(k,{model:a.childType,recordCreator:g.recordCreator}));}}g.endUpdate();},registerNode:function(f,a){var e=this,g=e.byIdMap[f.id],c,d,b;e.byIdMap[f.id]=f;if(f.onRegisterTreeNode&&f!==g){f.onRegisterTreeNode(e);
}if(f.onUnregisterTreeNode){e.nodesToUnregister++;}if(a===true){c=f.childNodes;d=c.length;for(b=0;b<d;b++){e.registerNode(c[b],true);}}},unregisterNode:function(f,a){var e=this,g=e.byIdMap[f.id],c,d,b;delete e.byIdMap[f.id];if(a===true){c=f.childNodes;d=c.length;for(b=0;b<d;b++){e.unregisterNode(c[b],true);
}}if(f.onUnregisterTreeNode&&f===g){f.onUnregisterTreeNode(e);e.nodesToUnregister--;}},onNodeSort:function(b,c){var a=this;a.suspendAutoSync();if((a.indexOf(b)!==-1&&b.isExpanded())||(b===a.getRoot()&&!a.getRootVisible())){Ext.suspendLayouts();a.onNodeCollapse(b,c);a.onNodeExpand(b,c);Ext.resumeLayouts(true);
}a.resumeAutoSync(a.autoSync);},applyRoot:function(e){var b=this,d=b.getModel(),a=d.prototype.idProperty,c=b.getDefaultRootId();if(e&&!e.isNode){e=Ext.apply({text:b.getDefaultRootText(),root:true,isFirst:true,isLast:true,depth:0,index:0,parentId:null,allowDrag:false},e);if(c&&e[a]===undefined){e[a]=c;
}e=new d(e);}return e;},updateRoot:function(g,b){var e=this,f,a=!b,d,c=[];e.getTrackRemoved();e.suspendEvent("add","remove");if(a){e.suspendEvent("refresh","datachanged");}if(b&&b.isModel){if(e.getRootVisible()){d=[b];}else{d=b.childNodes;}e.beforeNodeRemove(null,d,false,c);b.set("root",false);e.onNodeRemove(null,d,false,c);
b.fireEvent("remove",null,b,false);b.fireEvent("rootchange",null);b.clearListeners();b.store=b.treeStore=null;e.unregisterNode(b);}e.getData().clear();if(g){if(g.fireEventArgs("beforeappend",[null,g])===false){g=null;}else{f=g.parentNode;if(f){if(!f.removeChild(g,false,false,f.getTreeStore()===e)){return;
}}else{if((f=g.getTreeStore())&&f!==e&&g===f.getRoot()){f.setRoot(null);}}g.store=g.treeStore=e;g.set("root",true);g.updateInfo(true,{isFirst:true,isLast:true,depth:0,index:0,parentId:null});e.registerNode(g,true);g.fireEvent("append",null,g,false);g.fireEvent("rootchange",g);e.onNodeAppend(null,g,0);
g.phantom=true;}}if(!a){e.fireEvent("rootchange",g,b);}if(g&&(e.getAutoLoad()||g.isExpanded())){if(g.isLoaded()){e.onNodeExpand(g,g.childNodes);if(!a){e.fireEvent("datachanged",e);e.fireEvent("refresh",e);}}else{g.data.expanded=false;g.expand(false);if(g.isLoaded&&!e.getProxy().isSynchronous&&!a){e.fireEvent("datachanged",e);
e.fireEvent("refresh",e);}}}else{if(!a){e.fireEvent("datachanged",e);e.fireEvent("refresh",e);}}e.resumeEvent("add","remove");if(a){e.resumeEvent("refresh","datachanged");}},doDestroy:function(){var b=this,a=b.getRoot();if(a&&b.nodesToUnregister){a.cascade(function(c){if(c.onUnregisterTreeNode){c.onUnregisterTreeNode(b);
}});}b.callParent();},each:function(e,d,f){var c=0,b=f,a;if(f&&typeof f==="object"){a=f.collapsed;b=f.filtered;}if(a){this.getRoot().cascade(function(g){if(b===true||g.get("visible")){return e.call(d||g,g,c++);}});}else{return this.callParent([e,d,b]);}},collect:function(e,h,c){var b,a={},i=[],f=h,d,g;
if(h&&typeof h==="object"){b=h.collapsed;c=h.filtered;f=h.allowNull;}if(b||c){this.getRoot().cascade(function(j){if(c===true||j.get("visible")){g=j.get(e);d=String(g);if((f||!Ext.isEmpty(g))&&!a[d]){a[d]=1;i.push(g);}}if(!b&&!j.isExpanded()){return false;}});}else{i=this.callParent([e,f,c]);}return i;
},getNodeById:function(a){return this.byIdMap[a]||null;},findNode:function(g,f,d,c,b){if(Ext.isEmpty(f,false)){return null;}if(g===this.model.idProperty&&arguments.length<3){return this.byIdMap[f];}var e=Ext.String.createRegex(f,d,c,b),a=null;Ext.Object.eachValue(this.byIdMap,function(h){if(h&&e.test(h.get(g))){a=h;
return false;}});return a;},load:function(a){var b=a&&a.node;if(!b&&!(b=this.getRoot())){b=this.setRoot({expanded:true,autoRoot:true});return;}if(b.isLoading()){return;}return this.callParent([a]);},reload:function(a){var b=Ext.apply({},a,this.lastOptions);b.node=this.getRoot();return this.load(b);},flushLoad:function(){var f=this,i=f.pendingLoadOptions,a,g,h,d=f.getClearOnLoad(),e,b,c;
f.clearLoadTask();if(!i){return;}a=i.node||f.getRoot();e=a&&a.isRoot();g=i.callback;h=i.scope;i.params=i.params||{};if(a.data.expanded&&!e){a.data.loaded=false;if(d){a.data.expanded=false;}i.callback=function(k,j,l){if(!d){a.collapse();}a.expand();Ext.callback(g,h,[k,j,l]);};}i.id=a.getId();f.setLoadOptions(i);
if(f.getRemoteSort()&&i.sorters){f.fireEvent("beforesort",f,i.sorters);}i=Ext.apply({node:i.node||a,internalScope:f,internalCallback:f.onProxyLoad},i);f.lastOptions=Ext.apply({},i);i.isRootLoad=e;b=f.createOperation("read",i);if(f.fireEvent("beforeload",f,b)!==false){f.loading=true;if(e){if(f.getClearRemovedOnLoad()){f.removedNodes.length=0;
}if(d){f.unregisterNode(a,true);a.clear(false,true);f.registerNode(a);c=true;}}else{if(f.getTrackRemoved()&&f.getClearRemovedOnLoad()){f.clearRemoved(a);}if(d){a.removeAll(false);}}if(f.loading&&a){a.set("loading",true);}if(c){f.clearData(true);if(f.getRootVisible()){f.suspendEvents();f.add(a);f.resumeEvents();
}}b.execute();}return f;},onProxyLoad:function(c){var g=this,i=c.initialConfig,d=c.wasSuccessful(),b=c.getRecords(),a=i.node,e=i.isRootLoad,h=c.getScope()||g,f=[b,c,d];if(g.destroyed){return;}g.loading=false;a.set("loading",false);if(d){++g.loadCount;if(!g.getClearOnLoad()){b=g.cleanRecords(a,b);}if(g.getParentIdProperty()){b=g.treeify(a,b);
}if(e){g.suspendEvent("add","update");}b=g.fillNode(a,b);}Ext.callback(i.onChildNodesAvailable,h,f);if(e){g.resumeEvent("add","update");g.callObservers("BeforePopulate");g.fireEvent("datachanged",g);g.fireEvent("refresh",g);g.callObservers("AfterPopulate");}g.fireEvent("load",g,b,d,c,a);},clearRemoved:function(b){var j=this,e=j.removedNodes,a=b.getId(),d=e.length,c=d,m={},g=[],l={},h,f,k;
if(b===j.getRoot()){j.removedNodes.length=0;return;}for(;c--;){h=e[c];l[h.getId()]=h;}for(c=d;c--;){h=e[c];f=h;while(f&&f.getId()!==a){k=f.get("parentId")||f.get("lastParentId");f=f.parentNode||j.getNodeById(k)||l[k];}if(f){m[h.getId()]=h;}}for(c=0;c<d;c++){h=e[c];if(!m[h.getId()]){g.push(h);}}j.removedNodes=g;
},fillNode:function(c,a){var b=this,d=a?a.length:0;if(++b.bulkUpdate===1){b.suspendEvent("datachanged");}if(d){b.setupNodes(a);}if(b.bulkUpdate===1){c.set("loaded",true);}else{c.data.loaded=true;}if(a.length){c.appendChild(a,undefined,true);}if(!--b.bulkUpdate){b.resumeEvent("datachanged");}return a;
},setupNodes:function(d){var g=this,f=g.getSorters(),h=false,b=d.length,a=g.sortOnLoad&&b>1&&!g.getRemoteSort()&&g.getFolderSort()||f.length,c=g.needsLocalFilter(),k,j,e;if(c){g.doFilter(d[0]);}for(e=1;e<b;e++){k=d[e];j=d[e-1];if(c){g.doFilter(k);}h=k.data.index!==j.data.index;}if(a){g.needsIndexSort=true;
Ext.Array.sort(d,g.getSortFn());g.needsIndexSort=false;}else{if(h){Ext.Array.sort(d,g.sortByIndex);}}},beginFill:function(){var a=this;if(!a.fillCount++){a.beginUpdate();a.suspendEvent("add","update");a.suspendAutoSync();a.fillArray=[];}},endFill:function(e,b){var f=this,g=f.fillArray,d,a,c;g.push(b);
if(!--f.fillCount){f.resumeAutoSync();f.resumeEvent("add","update");for(d=0,a=g.length;d<a;d++){c=f.indexOf(g[d][0]);if(c!==-1){f.fireEvent("add",f,g[d],c);}}f.fillArray=null;f.endUpdate();}},sortByIndex:function(b,a){return b.data.index-a.data.index;},onIdChanged:function(d,f,b){var e=d.childNodes,a=e&&e.length,c;
this.callParent(arguments);delete this.byIdMap[f];this.byIdMap[b]=d;for(c=0;c<a;c++){e[c].set("parentId",b);}},treeify:function(h,e){var l=this,n=h.getId(),c=l.getParentIdProperty(),j=e.length,o=[],k={},f,d,g,m,a,b;for(f=0;f<j;f++){d=e[f];d.data.depth=1;k[d.id]=d;}for(f=0;f<j;f++){d=e[f];g=d.data[c];
if(!(g||g===0)||g===n){o.push(d);}else{if(!k[g]){Ext.raise('Ext.data.TreeStore, Invalid parentId "'+g+'"');}m=k[g];m.$children=m.$children||[];m.$children.push(d);d.data.depth=m.data.depth+1;}}for(a in k){d=k[a];b=d.$children;if(b){delete d.$children;l.setupNodes(b);d.appendChild(b);}l.registerNode(d);
}l.setupNodes(o);return o;},cleanRecords:function(f,b){var e={},h=f.childNodes,d=0,a=h.length,c=[],g;for(;d<a;++d){e[h[d].getId()]=true;}for(d=0,a=b.length;d<a;++d){g=b[d];if(!e[g.getId()]){c.push(g);}}return c;},removeAll:function(){this.suspendEvents();this.setRoot(null);this.resumeEvents();this.callParent();
},doSort:function(a){var b=this;if(b.getRemoteSort()){b.load();}else{b.tree.sort(a,true);b.fireEvent("datachanged",b);b.fireEvent("refresh",b);}b.fireEvent("sort",b,b.sorters.getRange());},filterVisible:function(a){return a.get("visible");},isVisible:function(c){var a=c.parentNode,d=c.data.visible,b=this.getRoot();
while(d&&a){d=a.data.expanded&&a.data.visible;a=a.parentNode;}return d&&!(c===b&&!this.getRootVisible());},commitChanges:function(){var a=this.removedNodes;if(a){a.length=0;}this.callParent();},getRootNode:function(){return this.getRoot();},setRootNode:function(a){this.setRoot(a);return this.getRoot();
},privates:{fireChangeEvent:function(a){return !!this.byIdMap[a.id];},getRawRemovedRecords:function(){return this.removedNodes;},createOperation:function(c,a){var e=this,d=a.node,b;if(e.useModelProxy&&d&&d!==e.getRootNode()){b=d.getProxy();}if(b&&b!==e.getProxy()){return b.createOperation(c,a);}else{return e.callParent([c,a]);
}},recordCreator:function(a,b){return new b(a);},doFilter:function(a){this.filterNodes(a,this.getFilters().getFilterFn(),true);},filterNodes:function(b,k,f){var g=this,a=g.filterer==="bottomup",d=k(b)&&f||(b.isRoot()&&!g.getRootVisible()),j=b.childNodes,e=j&&j.length,c,h;if(e){for(c=0;c<e;++c){h=g.filterNodes(j[c],k,d||a)||h;
}if(a){d=h||d;}}b.set("visible",d,g._silentOptions);return d;},needsLocalFilter:function(){return !this.getRemoteFilter()&&this.getFilters().length;},onRemoteFilterSet:function(a,c){var b=this.getData();b.setFilters(null);if(a){a.on("endupdate",this.onFilterEndUpdate,this);}},onRemoteSortSet:function(b,c){var a=this.getData();
a.setSorters(null);if(b){b.on("endupdate",this.onSorterEndUpdate,this);}}},deprecated:{5:{properties:{tree:null}}}});