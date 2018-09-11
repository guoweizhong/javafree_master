Ext.define("Ext.ux.statusbar.StatusBar",{extend:"Ext.toolbar.Toolbar",alternateClassName:"Ext.ux.StatusBar",alias:"widget.statusbar",requires:["Ext.toolbar.TextItem"],cls:"x-statusbar",busyIconCls:"x-status-busy",busyText:"Loading...",autoClear:5000,emptyText:"&#160;",activeThreadId:0,initComponent:function(){var a=this.statusAlign==="right";
this.callParent(arguments);this.currIconCls=this.iconCls||this.defaultIconCls;this.statusEl=Ext.create("Ext.toolbar.TextItem",{cls:"x-status-text "+(this.currIconCls||""),text:this.text||this.defaultText||""});if(a){this.cls+=" x-status-right";this.add("->");this.add(this.statusEl);}else{this.insert(0,this.statusEl);
this.insert(1,"->");}},setStatus:function(e){var a=this;e=e||{};Ext.suspendLayouts();if(Ext.isString(e)){e={text:e};}if(e.text!==undefined){a.setText(e.text);}if(e.iconCls!==undefined){a.setIcon(e.iconCls);}if(e.clear){var f=e.clear,d=a.autoClear,b={useDefaults:true,anim:true};if(Ext.isObject(f)){f=Ext.applyIf(f,b);
if(f.wait){d=f.wait;}}else{if(Ext.isNumber(f)){d=f;f=b;}else{if(Ext.isBoolean(f)){f=b;}}}f.threadId=this.activeThreadId;Ext.defer(a.clearStatus,d,a,[f]);}Ext.resumeLayouts(true);return a;},clearStatus:function(e){e=e||{};var c=this,b=c.statusEl;if(c.destroyed||e.threadId&&e.threadId!==c.activeThreadId){return c;
}var d=e.useDefaults?c.defaultText:c.emptyText,a=e.useDefaults?(c.defaultIconCls?c.defaultIconCls:""):"";if(e.anim){b.el.puff({remove:false,useDisplay:true,callback:function(){b.el.show();c.setStatus({text:d,iconCls:a});}});}else{c.setStatus({text:d,iconCls:a});}return c;},setText:function(b){var a=this;
a.activeThreadId++;a.text=b||"";if(a.rendered){a.statusEl.setText(a.text);}return a;},getText:function(){return this.text;},setIcon:function(a){var b=this;b.activeThreadId++;a=a||"";if(b.rendered){if(b.currIconCls){b.statusEl.removeCls(b.currIconCls);b.currIconCls=null;}if(a.length>0){b.statusEl.addCls(a);
b.currIconCls=a;}}else{b.currIconCls=a;}return b;},showBusy:function(a){if(Ext.isString(a)){a={text:a};}a=Ext.applyIf(a||{},{text:this.busyText,iconCls:this.busyIconCls});return this.setStatus(a);}});