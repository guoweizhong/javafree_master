Ext.define("Ext.drag.Source",{extend:"Ext.drag.Item",defaultIdPrefix:"source-",requires:["Ext.GlobalEvents","Ext.drag.Constraint"],config:{activateOnLongPress:false,activeCls:null,constrain:null,handle:null,local:null,proxy:"original",revert:false},dragging:false,constructor:function(a){var b=a&&a.describe;
if(b){this.describe=b;a=Ext.apply({},a);delete a.describe;}this.callParent([a]);this.manager=Ext.drag["Manager"];},describe:Ext.emptyFn,isDragging:function(){return this.dragging;},beforeDragStart:Ext.emptyFn,onDragCancel:Ext.emptyFn,onDragEnd:Ext.emptyFn,onDragMove:Ext.emptyFn,onDragStart:Ext.emptyFn,applyActivateOnLongPress:function(a){if(typeof a==="string"){a=[a];
}return a;},updateActivateOnLongPress:function(a){if(!this.isConfiguring){this.setupListeners();}},updateActiveCls:function(a,c){if(this.dragging){var b=this.getElement();b.replaceCls(c,a);}},applyConstrain:function(a){if(a&&!a.$isClass){if(a.isRegion){a={region:a};}else{if(a.isElement||!Ext.isObject(a)){a={element:a};
}}a=Ext.apply({source:this},a);a=Ext.Factory.dragConstraint(a);}return a;},updateElement:function(b,a){if(a&&!a.destroyed){a.un("dragstart","stopNativeDrag",this);}if(b&&!this.getHandle()){b.setTouchAction({panX:false,panY:false});b.on("dragstart","stopNativeDrag",this,{translate:false});}this.callParent([b,a]);
},updateHandle:function(){if(!this.isConfiguring){this.setupListeners();}},applyProxy:function(a){if(a){a=Ext.Factory.dragproxy(a);}return a;},updateProxy:function(b,a){if(a){a.destroy();}if(b){b.setSource(this);}},resolveListenerScope:function(){var c=this.ownerCmp,b=arguments;if(c){return c.resolveListenerScope.apply(c,b);
}return this.callParent(b);},destroy:function(){var a=this;a.manager=a.initialEvent=null;a.setConstrain(null);a.setProxy(null);a.callParent();},privates:{draggingCls:Ext.baseCSSPrefix+"drag-dragging",info:null,revertCls:Ext.baseCSSPrefix+"drag-revert",canActivateOnLongPress:function(b){var a=this.getActivateOnLongPress();
return !!(a&&(a===true||Ext.Array.contains(a,b.pointerType)));},dragCleanup:function(f){var e=this,b=e.getActiveCls(),c=e.getProxy(),d=e.getElement(),a=f?f.proxy.element:null;if(b){d.removeCls(b);}if(a){a.removeCls(e.draggingCls);}c.cleanup(f);e.dragging=false;e.initialEvent=e.info=null;},getElListeners:function(){var b={touchstart:"handleTouchStart",dragstart:"handleDragStart",drag:"handleDragMove",dragend:"handleDragEnd",dragcancel:"handleDragCancel"},a=this.getHandle();
if(a){b.dragstart={fn:b.dragstart,delegate:a};}if(this.getActivateOnLongPress()){b.longpress="handleLongPress";}return b;},handleDragCancel:function(d){var b=this,c=b.info,a=b.manager;if(a){a.onDragCancel(c,d);}b.onDragCancel(c);if(b.hasListeners.dragcancel){b.fireEvent("dragcancel",b,c,d);}Ext.fireEvent("dragcancel",b,c,d);
b.dragCleanup(c);},handleDragEnd:function(g){if(!this.dragging){return;}var d=this,c=d.manager,a=d.getRevert(),f=d.info,b=f.proxy;f.update(g);if(c){c.onDragEnd(f,g);}d.onDragEnd(f);if(d.hasListeners.dragend){d.fireEvent("dragend",d,f,g);}Ext.fireEvent("dragend",d,f,g);b=b.instance;if(a&&b){b.dragRevert(f,d.revertCls,a,function(){d.dragCleanup(f);
});}else{d.dragCleanup(f);}},handleDragMove:function(d){var b=this,c=b.info,a=b.manager;if(!b.dragging){return;}d.stopPropagation();d.claimGesture();c.update(d);if(a){a.onDragMove(c,d);}b.onDragMove(c);if(b.hasListeners.dragmove){b.fireEvent("dragmove",b,c,d);}},handleDragStart:function(g){var i=this,h=i.hasListeners,f=i.manager,j=i.getConstrain(),a=i.initialEvent,b,l,c,k,d;
if(i.preventStart(g)){return false;}if(h.initdragconstraints){i.fireEvent("initdragconstraints",i,g);}i.info=c=new Ext.drag.Info(i,a);i.setup(c);if(j){j.onDragStart(c);}c.update(g,true);k=i.beforeDragStart(c)===false;if(!k&&h.beforedragstart){k=i.fireEvent("beforedragstart",i,c,g)===false;}if(k){i.dragCleanup();
return false;}g.claimGesture();i.dragging=true;l=i.getActiveCls();b=i.getElement();if(l){b.addCls(l);}d=c.proxy.element;if(d){d.addCls(i.draggingCls);}c.update(g);if(f){f.onDragStart(c,g);}i.onDragStart(c);if(h.dragstart){i.fireEvent("dragstart",i,c,g);}Ext.fireEvent("dragstart",i,c,g);},handleLongPress:function(a){if(!this.isDisabled()&&this.canActivateOnLongPress(a)){this.initialEvent=a;
a.startDrag();}},handleTouchStart:function(a){if(!this.isDisabled()){this.initialEvent=a;}},preventStart:function(a){return this.isDisabled()||(!a.longpress&&this.canActivateOnLongPress(a));},setup:Ext.privateFn,stopNativeDrag:function(a){a.preventDefault();}}});