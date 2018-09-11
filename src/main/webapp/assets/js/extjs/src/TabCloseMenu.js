Ext.define("Ext.ux.TabCloseMenu",{extend:"Ext.plugin.Abstract",alias:"plugin.tabclosemenu",mixins:{observable:"Ext.util.Observable"},closeTabText:"Close Tab",showCloseOthers:true,closeOthersTabsText:"Close Other Tabs",showCloseAll:true,closeAllTabsText:"Close All Tabs",extraItemsHead:null,extraItemsTail:null,constructor:function(a){this.callParent([a]);
this.mixins.observable.constructor.call(this,a);},init:function(a){this.tabPanel=a;this.tabBar=a.down("tabbar");this.mon(this.tabPanel,{scope:this,afterlayout:this.onAfterLayout,single:true});},onAfterLayout:function(){this.mon(this.tabBar.el,{scope:this,contextmenu:this.onContextMenu,delegate:".x-tab"});
},destroy:function(){Ext.destroy(this.menu);this.callParent();},onContextMenu:function(d,f){var c=this,g=c.createMenu(),e=true,h=true,b=c.tabBar.getChildByElement(f),a=c.tabBar.items.indexOf(b);c.item=c.tabPanel.getComponent(a);g.child("#close").setDisabled(!c.item.closable);if(c.showCloseAll||c.showCloseOthers){c.tabPanel.items.each(function(i){if(i.closable){e=false;
if(i!==c.item){h=false;return false;}}return true;});if(c.showCloseAll){g.child("#closeAll").setDisabled(e);}if(c.showCloseOthers){g.child("#closeOthers").setDisabled(h);}}d.preventDefault();c.fireEvent("beforemenu",g,c.item,c);g.showAt(d.getXY());},createMenu:function(){var b=this;if(!b.menu){var a=[{itemId:"close",text:b.closeTabText,scope:b,handler:b.onClose}];
if(b.showCloseAll||b.showCloseOthers){a.push("-");}if(b.showCloseOthers){a.push({itemId:"closeOthers",text:b.closeOthersTabsText,scope:b,handler:b.onCloseOthers});}if(b.showCloseAll){a.push({itemId:"closeAll",text:b.closeAllTabsText,scope:b,handler:b.onCloseAll});}if(b.extraItemsHead){a=b.extraItemsHead.concat(a);
}if(b.extraItemsTail){a=a.concat(b.extraItemsTail);}b.menu=Ext.create("Ext.menu.Menu",{items:a,listeners:{hide:b.onHideMenu,scope:b}});}return b.menu;},onHideMenu:function(){var a=this;a.fireEvent("aftermenu",a.menu,a);},onClose:function(){this.tabPanel.remove(this.item);},onCloseOthers:function(){this.doClose(true);
},onCloseAll:function(){this.doClose(false);},doClose:function(b){var a=[];this.tabPanel.items.each(function(c){if(c.closable){if(!b||c!==this.item){a.push(c);}}},this);Ext.suspendLayouts();Ext.Array.forEach(a,function(c){this.tabPanel.remove(c);},this);Ext.resumeLayouts(true);}});