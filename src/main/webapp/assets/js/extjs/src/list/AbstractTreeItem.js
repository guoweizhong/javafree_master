Ext.define("Ext.list.AbstractTreeItem",{extend:"Ext.Widget",isTreeListItem:true,cachedConfig:{expandable:false,expanded:false,iconCls:"",leaf:true,loading:false,selected:false,selectedParent:false},config:{iconClsProperty:"iconCls",indent:null,owner:null,node:null,over:null,parentItem:null,text:{lazy:true,$value:""},textProperty:"text"},updateNode:function(d){if(d){var g=this,a=g.itemMap,h,b,f,e,j,c;
g.element.dom.setAttribute("data-recordId",d.internalId);if(!a){h=d.childNodes;b=g.getOwner();g.itemMap=a={};for(e=0,f=h.length;e<f;++e){c=h[e];if(c.data.visible){j=b.createItem(c,g);a[c.internalId]=j;g.insertItem(j,null);}}}g.setExpanded(d.isExpanded());g.doNodeUpdate(d);}},updateSelected:function(b){if(!this.isConfiguring){var a=this.getParentItem();
while(a&&!a.isRootListItem){a.setSelectedParent(b);a=a.getParentItem();}}},collapse:function(){this.getNode().collapse();},expand:function(){this.getNode().expand();},getToolElement:Ext.emptyFn,insertItem:Ext.emptyFn,isExpanded:function(){return this.getExpanded();},isSelectionEvent:Ext.emptyFn,isToggleEvent:Ext.emptyFn,nodeCollapse:function(c,e){var b=this,a=b.getOwner(),d=b.preventAnimation?null:a.getAnimation();
b.nodeCollapseBegin(d,e);if(!d){b.nodeCollapseEnd(e);}},nodeCollapseBegin:function(c,d){var b=this,a=b.getOwner();b.setExpanded(false);a.fireEvent("itemcollapse",a,b);},nodeCollapseEnd:function(a){if(!a&&!this.destroying){this.getOwner().updateLayout();}},nodeExpand:function(c){var b=this,a=b.getOwner(),e=b.getFloated(),d=!e&&a.getAnimation();
b.nodeExpandBegin(d);if(!d){b.nodeExpandEnd();}},nodeExpandBegin:function(c){var b=this,a=b.getOwner();b.setExpanded(true);a.fireEvent("itemexpand",a,b);},nodeExpandEnd:function(){if(!this.destroying){this.getOwner().updateLayout();}},nodeInsert:function(d,f){var g=this,c=g.getOwner(),a=g.itemMap,b=d.internalId,i=c.getItem(d),e=null,h;
if(i){h=i.getParentItem();h.removeItem(i);if(h!==g){h.doUpdateExpandable();i.setParentItem(g);}}else{i=g.getOwner().createItem(d,g);}a[b]=i;if(f){e=a[f.internalId];}g.insertItem(i,e);g.doUpdateExpandable();c.fireEvent("iteminsert",c,g,i,e);c.updateLayout();},nodeRemove:function(d){var c=this,e=c.itemMap,a=c.getOwner(),f=d.internalId,b=e[f];
if(b){delete e[f];c.removeItem(b);b.destroy();c.doUpdateExpandable();a.fireEvent("itemremove",a,c,b);a.updateLayout();}},nodeUpdate:function(b,a){this.doNodeUpdate(b);},onClick:function(f){var c=this,a=c.getOwner(),b=c.getNode(),d={event:f,item:c,node:b,tree:a,select:b.get("selectable")!==false&&c.isSelectionEvent(f),toggle:c.isToggleEvent(f)};
if(a.fireEvent("itemclick",a,d)!==false){if(d.toggle){c.toggleExpanded();f.preventDefault();}if(d.select){a.setSelection(c.getNode());}}},removeItem:Ext.emptyFn,destroy:function(){var c=this,d=c.itemMap,a=c.getOwner(),b;if(d){for(b in d){d[b].destroy();}c.itemMap=null;}if(a){a.removeItem(c.getNode());
}c.setNode(null);c.setParentItem(null);c.setOwner(null);c.callParent();},privates:{doNodeUpdate:function(d){var c=this,b=this.getTextProperty(),a=this.getIconClsProperty();if(b){c.setText(d.data[b]);}if(a){c.setIconCls(d.data[a]);}c.setLoading(d.isLoading());c.setLeaf(d.isLeaf());c.doUpdateExpandable();
},doUpdateExpandable:function(){var a=this.getNode();this.setExpandable(a.isExpandable());},toggleExpanded:function(){if(this.isExpanded()){this.collapse();}else{this.expand();}},updateIndent:function(b){var a=this.itemMap,c;for(c in a){a[c].setIndent(b);}},updateOwner:function(a){this.parent=a;}}});
