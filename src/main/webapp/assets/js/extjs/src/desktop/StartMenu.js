Ext.define("Ext.ux.desktop.StartMenu",{extend:"Ext.menu.Menu",baseCls:Ext.baseCSSPrefix+"panel",cls:"x-menu ux-start-menu",bodyCls:"ux-start-menu-body",defaultAlign:"bl-tl",iconCls:"user",bodyBorder:true,width:300,initComponent:function(){var a=this;a.layout.align="stretch";a.items=a.menu;a.callParent();
a.toolbar=new Ext.toolbar.Toolbar(Ext.apply({dock:"right",cls:"ux-start-menu-toolbar",vertical:true,width:100,layout:{align:"stretch"}},a.toolConfig));a.addDocked(a.toolbar);delete a.toolItems;},addMenuItem:function(){var a=this.menu;a.add.apply(a,arguments);},addToolItem:function(){var a=this.toolbar;
a.add.apply(a,arguments);}});