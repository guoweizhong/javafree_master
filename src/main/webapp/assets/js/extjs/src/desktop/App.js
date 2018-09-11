Ext.define("Ext.ux.desktop.App",{mixins:{observable:"Ext.util.Observable"},requires:["Ext.container.Viewport","Ext.ux.desktop.Desktop"],isReady:false,modules:null,useQuickTips:true,constructor:function(a){var b=this;b.mixins.observable.constructor.call(this,a);if(Ext.isReady){Ext.Function.defer(b.init,10,b);
}else{Ext.onReady(b.init,b);}},init:function(){var b=this,a;if(b.useQuickTips){Ext.QuickTips.init();}b.modules=b.getModules();if(b.modules){b.initModules(b.modules);}a=b.getDesktopConfig();b.desktop=new Ext.ux.desktop.Desktop(a);b.viewport=new Ext.container.Viewport({layout:"fit",items:[b.desktop]});
Ext.getWin().on("beforeunload",b.onUnload,b);b.isReady=true;b.fireEvent("ready",b);},getDesktopConfig:function(){var b=this,a={app:b,taskbarConfig:b.getTaskbarConfig()};Ext.apply(a,b.desktopConfig);return a;},getModules:Ext.emptyFn,getStartConfig:function(){var b=this,a={app:b,menu:[]},c;Ext.apply(a,b.startConfig);
Ext.each(b.modules,function(d){c=d.launcher;if(c){c.handler=c.handler||Ext.bind(b.createWindow,b,[d]);a.menu.push(d.launcher);}});return a;},createWindow:function(a){var b=a.createWindow();b.show();},getTaskbarConfig:function(){var b=this,a={app:b,startConfig:b.getStartConfig()};Ext.apply(a,b.taskbarConfig);
return a;},initModules:function(a){var b=this;Ext.each(a,function(c){c.app=b;});},getModule:function(d){var c=this.modules;for(var e=0,b=c.length;e<b;e++){var a=c[e];if(a.id==d||a.appType==d){return a;}}return null;},onReady:function(b,a){if(this.isReady){b.call(a,this);}else{this.on({ready:b,scope:a,single:true});
}},getDesktop:function(){return this.desktop;},onUnload:function(a){if(this.fireEvent("beforeunload",this)===false){a.stopEvent();}}});