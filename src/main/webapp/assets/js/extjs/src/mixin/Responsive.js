Ext.define("Ext.mixin.Responsive",function(a){return{extend:"Ext.Mixin",requires:["Ext.GlobalEvents"],mixinConfig:{id:"responsive",after:{destroy:"destroy"}},config:{responsiveConfig:{$value:undefined,merge:function(g,c,f,e){if(!g){return c;}var b=c?Ext.Object.chain(c):{},d;for(d in g){if(!e||!(d in b)){b[d]={fn:null,config:g[d]};
}}return b;}},responsiveFormulas:{$value:0,merge:function(e,b,d,c){return this.mergeNew(e,b,d,c);}}},destroy:function(){a.unregister(this);},privates:{statics:{active:false,all:{},context:Ext.Object.chain(Ext.platformTags),count:0,nextId:0,activate:function(){a.active=true;a.updateContext();Ext.on("resize",a.onResize,a);
},deactivate:function(){a.active=false;Ext.un("resize",a.onResize,a);},notify:function(){var d=a.all,c=a.context,b=Ext.GlobalEvents,f=a.timer,e;if(f){a.timer=null;Ext.asapCancel(f);}a.updateContext();Ext.suspendLayouts();b.fireEvent("beforeresponsiveupdate",c);for(e in d){d[e].setupResponsiveContext();
}b.fireEvent("beginresponsiveupdate",c);for(e in d){d[e].updateResponsiveState();}b.fireEvent("responsiveupdate",c);Ext.resumeLayouts(true);},onResize:function(){if(!a.timer){a.timer=Ext.asap(a.onTimer);}},onTimer:function(){a.timer=null;a.notify();},processConfig:function(b,h,f){var g=h&&h[f],e=b.config,c,d;
if(g){d=b.self.getConfigurator();c=d.configs[f];e[f]=c.merge(g,e[f],b);}},register:function(b){var c=b.$responsiveId;if(!c){b.$responsiveId=c=++a.nextId;a.all[c]=b;if(++a.count===1){a.activate();}}},unregister:function(b){var c=b.$responsiveId;if(c in a.all){b.$responsiveId=null;delete a.all[c];if(--a.count===0){a.deactivate();
}}},updateContext:function(){var e=Ext.Element,d=e.getViewportWidth(),b=e.getViewportHeight(),c=a.context;c.width=d;c.height=b;c.tall=d<b;c.wide=!c.tall;c.landscape=c.portrait=false;if(!c.platform){c.platform=Ext.platformTags;}c[Ext.dom.Element.getOrientation()]=true;}},afterClassMixedIn:function(f){var e=f.prototype,b=e.responsiveConfig,d=e.responsiveFormulas,c;
if(b||d){c={};if(b){delete e.responsiveConfig;c.responsiveConfig=b;}if(d){delete e.responsiveFormulas;c.responsiveFormulas=d;}f.getConfigurator().add(c);}},applyResponsiveConfig:function(c){for(var b in c){c[b].fn=Ext.createRuleFn(b);}return c;},applyResponsiveFormulas:function(d){var c={},e,b;if(d){for(b in d){if(Ext.isString(e=d[b])){e=Ext.createRuleFn(e);
}c[b]=e;}}return c;},getResponsiveState:function(){var c=a.context,f=this.getResponsiveConfig(),b={},d,e;if(f){for(e in f){d=f[e];if(d.fn.call(this,c)){Ext.merge(b,d.config);}}}return b;},setupResponsiveContext:function(){var c=this.getResponsiveFormulas(),d=a.context,b;if(c){for(b in c){d[b]=c[b].call(this,d);
}}},transformInstanceConfig:function(d){var c=this,b;a.register(c);if(d){a.processConfig(c,d,"responsiveConfig");a.processConfig(c,d,"responsiveFormulas");}c.setupResponsiveContext();b=c.getResponsiveState();if(d){b=Ext.merge({},d,b);delete b.responsiveConfig;delete b.responsiveFormulas;}return b;},updateResponsiveState:function(){var b=this.getResponsiveState();
this.setConfig(b);}}};});