Ext.define("Ext.data.virtual.Store",{extend:"Ext.data.ProxyStore",alias:"store.virtual",requires:["Ext.util.SorterCollection","Ext.util.FilterCollection","Ext.data.virtual.PageMap","Ext.data.virtual.Range"],uses:["Ext.data.virtual.Group"],isVirtualStore:true,config:{data:null,totalCount:null,leadingBufferZone:200,trailingBufferZone:50},remoteSort:true,remoteFilter:true,sortOnLoad:false,trackRemoved:false,constructor:function(a){var b=this;
b.sortByPage=b.sortByPage.bind(b);b.activeRanges=[];b.pageMap=new Ext.data.virtual.PageMap({store:b});b.callParent([a]);},doDestroy:function(){this.pageMap.destroy();this.callParent();},applyGrouper:function(a){this.group(a);return this.grouper;},contains:function(a){return this.indexOf(a)>-1;},createActiveRange:function(b){var a=Ext.apply({leadingBufferZone:this.getLeadingBufferZone(),trailingBufferZone:this.getTrailingBufferZone(),store:this},b);
return new Ext.data.virtual.Range(a);},getAt:function(b){var c=this.pageMap.getPageOf(b,false),a;if(c&&c.records){a=c.records[b-c.begin];}return a||null;},getById:function(a){return this.pageMap.byId[a]||null;},getCount:function(){return this.totalCount||0;},getGrouper:function(){return this.grouper;
},getGroups:function(){var b=this,a=b.groupCollection;if(!a){b.groupCollection=a=new Ext.util.Collection();}return a;},getSummaryRecord:function(){return this.summaryRecord||null;},isGrouped:function(){return !!this.grouper;},group:function(a,c){var b=this;a=a||null;if(a){if(typeof a==="string"){a={property:a,direction:c||"ASC"};
}if(!a.isGrouper){a=new Ext.util.Grouper(a);}a.setRoot("data");b.getGroups().getSorters().splice(0,1,{property:"id",direction:a.getDirection()});}b.grouper=a;if(!b.isConfiguring){b.reload();b.fireEvent("groupchange",b,a);}},getByInternalId:function(a){return this.pageMap.getByInternalId(a);},indexOf:function(a){return this.pageMap.indexOf(a);
},indexOfId:function(b){var a=this.getById(b);return a?this.indexOf(a):-1;},load:function(c){if(typeof c==="function"){c={callback:c};}var d=this,e=(c&&c.page)||1,a=d.getPageSize(),b=d.createOperation("read",Ext.apply({start:(e-1)*a,limit:a,page:e,filters:d.getFilters().items,sorters:d.getSorters().items,grouper:d.getGrouper()},c));
b.execute();return b;},reload:function(a){if(typeof a==="function"){a={callback:a};}var b=this;if(b.fireEvent("beforereload")===false){return null;}a=Ext.apply({internalScope:b,internalCallback:b.handleReload,page:1},a);b.pageMap.clear();b.getGroups().clear();return b.load(a);},removeAll:function(){var a=this.activeRanges,b;
this.pageMap.clear();for(b=a.length;b-->0;){a[b].reset();}},applyProxy:function(a){a=this.callParent([a]);if(a&&a.setEnablePaging){a.setEnablePaging(true);}return a;},createFiltersCollection:function(){return new Ext.util.FilterCollection();},createSortersCollection:function(){return new Ext.util.SorterCollection();
},onFilterEndUpdate:function(){var b=this,a=b.getFilters(false);if(!b.isConfiguring){b.reload();b.fireEvent("filterchange",b,a.getRange());}},onSorterEndUpdate:function(){var b=this,c=b.getSorters().getRange(),a=!b.isConfiguring;if(a){b.fireEvent("beforesort",b,c);}if(a){b.reload();b.fireEvent("sort",b,c);
}},updatePageSize:function(b){var a=this.totalCount;if(a!==null){this.pageMap.setPageCount(Math.ceil(a/b));}},updateTotalCount:function(b,c){var d=this,a=d.pageMap;d.totalCount=b;a.setPageCount(Math.ceil(b/d.getPageSize()));d.fireEvent("totalcountchange",d,b,c);},add:function(){Ext.raise("Virtual stores do not support the add() method");
},insert:function(){Ext.raise("Virtual stores do not support the insert() method");},filter:function(){if(!this.getRemoteFilter()){Ext.raise("Virtual stores do not support local filtering");}this.callParent(arguments);},filterBy:function(){Ext.raise("Virtual stores do not support local filtering");},loadData:function(){Ext.raise("Virtual stores do not support the loadData() method");
},applyData:function(){Ext.raise("Virtual stores do not support direct data loading");},updateRemoteFilter:function(a,b){if(a===false){Ext.raise("Virtual stores are always remotely filtered.");}this.callParent([a,b]);},updateRemoteSort:function(b,a){if(b===false){Ext.raise("Virtual stores are always remotely sorted.");
}this.callParent([b,a]);},updateTrackRemoved:function(a){if(a!==false){Ext.raise("Virtual stores do not support trackRemoved.");}this.callParent(arguments);},privates:{attachSummaryData:function(e){var f=this,c=e.getSummaryData(),b,a,d,g,h;if(c){f.summaryRecord=c;}c=e.getGroupData();if(c){b=f.getGrouper();
if(b){f.groupSummaryData=g={};for(d=0,a=c.length;d<a;++d){h=c[d];g[b.getGroupString(h)]=h;}}}},handleReload:function(g){var f=this,d=f.activeRanges,a=d.length,b=f.pageMap,e,c;if(g.wasSuccessful()){f.readTotalCount(g.getResultSet());f.fireEvent("reload",f,g);for(e=0;e<a;++e){c=d[e];if(b.canSatisfy(c)){c.reload();
}}}},loadVirtualPage:function(c,e,a){var b=this,d=b.pageMap.generation;return b.load({page:c.number+1,internalCallback:function(g){var f=g.getResultSet();if(d===b.pageMap.generation){if(g.wasSuccessful()){b.readTotalCount(f);b.attachSummaryData(f);}e.call(a||c,g);b.groupSummaryData=null;}}});},lockGroups:function(a,o){var d=this.getGroups(),b=o.groupInfo={},e=o.records,m=e.length,l=this.groupSummaryData,f=this.pageMap,c=o.number,p,h,r,q,g,k,j;
for(h=0;h<m;++h){g=e[h];r=a.getGroupString(g);if(!b[r]){b[r]=g;p=d.get(r);if(!p){p=new Ext.data.virtual.Group(r);d.add(p);}k=p.firstRecords;j=k[0];if(j&&c<f.getPageIndex(j)){k.unshift(g);}else{k.push(g);}q=l&&l[r];if(q){p.summaryRecord=q;}}}},onPageDataAcquired:function(b){var a=this.getGrouper();if(a){this.lockGroups(a,b);
}},onPageEvicted:function(b){var a=this.getGrouper();if(a){this.releaseGroups(a,b);}},readTotalCount:function(a){var b=a.getRemoteTotal();if(!isNaN(b)){this.setTotalCount(b);}},releaseGroups:function(b,f){var a=this.getGroups(),e=f.groupInfo,h,c,d,g;for(d in e){h=e[d];g=a.get(d);c=g.firstRecords;if(c.length===1){a.remove(g);
}else{if(c[0]===h){c.shift();c.sort(this.sortByPage);}else{Ext.Array.remove(c,h);}}}},sortByPage:function(b,a){var c=this.pageMap;return c.getPageIndex(b)-c.getPageIndex(a);}}});