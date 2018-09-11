Ext.define("Ext.util.GroupCollection",{extend:"Ext.util.Collection",requires:["Ext.util.Group","Ext.util.SorterCollection","Ext.util.FilterCollection"],isGroupCollection:true,config:{grouper:null,groupConfig:null,itemRoot:null},observerPriority:-100,emptyGroupRetainTime:300000,constructor:function(a){this.emptyGroups={};
this.callParent([a]);this.on("remove","onGroupRemove",this);},getItemGroup:function(b){var a=this.getGrouper().getGroupString(b);return this.get(a);},onCollectionAdd:function(b,a){if(!this.isConfiguring){this.addItemsToGroups(b,a.items,a.at);}},onCollectionBeforeItemChange:function(b,a){this.changeDetails=a;
},onCollectionBeginUpdate:function(){this.beginUpdate();},onCollectionEndUpdate:function(){this.endUpdate();},onCollectionItemChange:function(b,a){if(!a.indexChanged){this.syncItemGrouping(b,a);}this.changeDetails=null;},onCollectionRefresh:function(a){if(a.generation){var h=this,e=h.itemGroupKeys={},b=h.createEntries(a,a.items),f=b.entries,l,d,g,k,c;
for(d=0,g=f.length;d<g;++d){k=f[d];k.group.splice(0,1e+99,k.items);for(c=0;c<k.items.length;c++){e[a.getKey(k.items[c])]=k.group;}}f=null;for(l in h.map){if(!(l in b.groups)){(f||(f=[])).push(h.map[l]);}}if(f){h.remove(f);}h.sortItems();}},onCollectionRemove:function(a,b){var k=this,o=k.changeDetails,g=k.itemGroupKeys||(k.itemGroupKeys={}),h,l,m,f,c,e,d,p;
if(a.getCount()){if(o){p=o.item||o.items[0];h=k.createEntries(a,[p]).entries;h[0].group=g["oldKey" in b?b.oldKey:a.getKey(p)];}else{h=k.createEntries(a,b.items).entries;}for(f=0,c=h.length;f<c;++f){m=(l=h[f]).group;if(m){m.remove(l.items);}for(e=0;e<l.items.length;e++){delete g[a.getKey(l.items[e])];
}if(m&&!m.length){(d||(d=[])).push(m);}}}else{k.itemGroupKeys={};d=k.items;for(f=0,c=d.length;f<c;++f){d[f].clear();}}if(d){k.remove(d);}},onCollectionSort:function(e){var d=this,g=e.getSorters(false),a,c,b,f;if(g){a=d.items;c=d.length;for(b=0;b<c;++b){f=a[b];if(f.getSorters()!==g){f.setSorters(g);}}}},onCollectionUpdateKey:function(b,a){if(!a.indexChanged){a.oldIndex=b.indexOf(a.item);
this.syncItemGrouping(b,a);}},addItemsToGroups:function(a,m,c,o){var n=this,g=n.itemGroupKeys||(n.itemGroupKeys={}),h=n.createEntries(a,m).entries,l=-1,d,p,f,k,e,q,b,r;for(f=0,k=h.length;f<k;++f){p=h[f];q=p.group;if(o||o===0){r=m[0];if(q.getCount()>0&&a.getSorters().getCount()===0){b=a.indexOf(q.items[0]);
if(o<b){l=0;}else{l=o-b;}}if(l===-1){q.add(r);}else{q.insert(l,r);}}else{if(n.length>1&&c){d=a.indexOf(h[0].group.getAt(0));c=Math.max(c-d,0);}p.group.insert(c!=null?c:q.items.length,p.items);for(e=0;e<p.items.length;e++){g[a.getKey(p.items[e])]=p.group;}}}n.sortItems();},createEntries:function(a,g){var h=this,c={},e=[],b=h.getGrouper(),j,k,m,d,l,f;
for(d=0,f=g.length;d<f;++d){m=b.getGroupString(l=g[d]);if(!(j=c[m])){k=h.getGroup(a,m);e.push(c[m]=j={group:k,items:[]});}j.items.push(l);}return{groups:c,entries:e};},syncItemGrouping:function(a,b){var g=this,f=g.itemGroupKeys||(g.itemGroupKeys={}),i=b.item,e,d,c,h;d=a.getKey(i);e="oldKey" in b?b.oldKey:d;
c=f[e];h=g.getGroup(a,g.getGrouper().getGroupString(i));if(h===c){c.itemChanged(i,b.modified,b.oldKey,b);}else{if(c){c.updateKey(i,e,d);c.remove(i);if(!c.length){g.remove(c);}}g.addItemsToGroups(a,[i],null,b.oldIndex);}delete f[e];f[d]=h;},getGroup:function(d,b){var c=this,e=c.get(b),a=c.getAutoSort();
if(e){e.setSorters(d.getSorters());}else{e=c.emptyGroups[b]||Ext.create(Ext.apply({xclass:"Ext.util.Group",groupKey:b,rootProperty:c.getItemRoot(),sorters:d.getSorters()},c.getGroupConfig()));e.ejectTime=null;c.setAutoSort(false);c.add(e);c.setAutoSort(a);}return e;},getKey:function(a){return a.getGroupKey();
},createSortFn:function(){var c=this,a=c.getGrouper(),b=c.getSorters().getSortFn();if(!a){return b;}return function(d,e){return a.sort(d.items[0],e.items[0])||b(d,e);};},updateGrouper:function(a){var b=this;b.grouped=!!(a&&b.$groupable.getAutoGroup());b.onSorterChange();b.onEndUpdateSorters(b.getSorters());
},destroy:function(){var a=this;a.$groupable=null;a.destroyGroups(a.items);clearTimeout(a.checkRemoveQueueTimer);a.callParent();},privates:{destroyGroups:function(b){var a=b.length,c;for(c=0;c<a;++c){b[c].destroy();}},onGroupRemove:function(h,g){var d=this,b=g.items,e=d.emptyGroups,a,f,c;b=Ext.Array.from(b);
for(c=0,a=b.length;c<a;c++){f=b[c];f.setSorters(null);e[f.getGroupKey()]=f;f.ejectTime=Ext.now();}d.checkRemoveQueue();},checkRemoveQueue:function(){var c=this,d=c.emptyGroups,b,e,a;for(b in d){e=d[b];if(!e.getCount()&&Ext.now()-e.ejectTime>c.emptyGroupRetainTime){Ext.destroy(e);delete d[b];}else{a=true;
}}if(a){clearTimeout(c.checkRemoveQueueTimer);c.checkRemoveQueueTimer=Ext.defer(c.checkRemoveQueue,c.emptyGroupRetainTime,c);}}}});