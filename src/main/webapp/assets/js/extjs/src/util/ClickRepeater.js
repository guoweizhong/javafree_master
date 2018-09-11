Ext.define("Ext.util.ClickRepeater",{alternateClassName:"Ext.util.TapRepeater",mixins:["Ext.mixin.Observable"],config:{el:null,target:null,disabled:null},interval:20,delay:250,preventDefault:true,stopDefault:false,timer:0,handler:null,scope:null,constructor:function(a){var b=this;if(arguments.length===2){b.setEl(a);
a=arguments[1];}b.mixins.observable.constructor.call(this,a);},destroy:function(){this.setEl(null);this.callParent();},privates:{fireClick:function(b){var a=this;a.fireEvent("click",a,b);Ext.callback(a.handler,a.scope,[a,b],0,a.getTarget());},updateDisabled:function(a){var b=this;if(a){b.savedEl=b.getEl();
b.setEl(null);}else{if(b.savedEl){b.setEl(b.savedEl);}}},updateTarget:function(a){this.setEl(a.el);},updateEl:function(c,a){var b=this,d;if(a){a.selectable();clearTimeout(b.timer);if(b.pressedCls){a.removeCls(b.pressedCls);}Ext.getDoc().un("mouseup",b.handleMouseUp,b);b.elListeners=Ext.destroy(b.elListeners);
}if(c){c.unselectable();d={mousedown:b.handleMouseDown,scope:b,destroyable:true};if(b.preventDefault||b.stopDefault){d.click=b.eventOptions;}b.elListeners=c.on(d);}},eventOptions:function(a){if(this.preventDefault){a.preventDefault();}if(this.stopDefault){a.stopEvent();}},handleMouseDown:function(c){var b=this,a=b.getEl();
clearTimeout(b.timer);if(b.pressedCls){a.addCls(b.pressedCls);}b.mousedownTime=Ext.now();if(c.pointerType==="mouse"){a.on("mouseout",b.handleMouseOut,b);}Ext.getDoc().on("mouseup",b.handleMouseUp,b);b.fireEvent("mousedown",b,c);b.fireClick(c);if(b.accelerate){b.delay=400;}b.timer=Ext.defer(b.click,b.delay||b.interval,b,[c]);
if(b.mousedownPreventDefault){c.preventDefault();}if(b.mousedownStopEvent){c.stopEvent();}},click:function(b){var a=this;a.fireClick(b);a.timer=Ext.defer(a.click,a.accelerate?a.easeOutExpo(Ext.now()-a.mousedownTime,400,-390,12000):a.interval,a,[b]);},easeOutExpo:function(e,a,g,f){return(e===f)?a+g:g*(-Math.pow(2,-10*e/f)+1)+a;
},handleMouseOut:function(){var b=this,a=b.getEl();clearTimeout(b.timer);if(b.pressedCls){a.removeCls(b.pressedCls);}a.on("mouseover",b.handleMouseReturn,b);},handleMouseReturn:function(c){var b=this,a=b.getEl();a.un("mouseover",b.handleMouseReturn,b);if(b.pressedCls){a.addCls(b.pressedCls);}b.click(c);
},handleMouseUp:function(c){var b=this,a=b.getEl();clearTimeout(b.timer);a.un("mouseover",b.handleMouseReturn,b);a.un("mouseout",b.handleMouseOut,b);Ext.getDoc().un("mouseup",b.handleMouseUp,b);if(b.pressedCls){a.removeCls(b.pressedCls);}b.fireEvent("mouseup",b,c);}}});