Ext.define("Ext.util.KeyNav",{alternateClassName:"Ext.KeyNav",requires:["Ext.util.KeyMap"],disabled:false,defaultEventAction:false,forceKeyDown:false,eventName:"keypress",statics:{keyOptions:{left:37,right:39,up:38,down:40,space:32,pageUp:33,pageDown:34,del:46,backspace:8,home:36,end:35,enter:13,esc:27,tab:9}},constructor:function(a){var c=this,b,d;
if(arguments.length===2){Ext.raise("2-argument KeyNav constructor is removed. Use a config object instead.");}a=a||{};b={target:a.target,ignoreInputFields:a.ignoreInputFields,eventName:c.getKeyEvent("forceKeyDown" in a?a.forceKeyDown:c.forceKeyDown,a.eventName),capture:a.capture};if(c.map){c.map.destroy();
}c.initConfig(a);if(a.processEvent){b.processEvent=a.processEvent;b.processEventScope=a.processEventScope||c;}if(a.priority){b.priority=a.priority;}if(a.keyMap){d=c.map=a.keyMap;}else{d=c.map=new Ext.util.KeyMap(b);c.destroyKeyMap=true;}this.addBindings(a);d.disable();if(!a.disabled){d.enable();}},addBindings:function(b){var e=this,a=e.map,c=Ext.util.KeyNav.keyOptions,g=Ext.event.Event,f=b.scope||e,d,h,i;
for(h in b){d=b[h];i=h.length===1?h.charCodeAt(0):(c[h]||g[h.toUpperCase()]);if(i!=null){h=i;}if(d&&(h.length===1||!isNaN(h=parseInt(h,10)))){if(typeof d==="function"){d={handler:d,defaultEventAction:(b.defaultEventAction!==undefined)?b.defaultEventAction:e.defaultEventAction};}a.addBinding({key:h,ctrl:d.ctrl,shift:d.shift,alt:d.alt,handler:Ext.Function.bind(e.handleEvent,d.scope||f,[d.handler||d.fn,e],true),defaultEventAction:(d.defaultEventAction!==undefined)?d.defaultEventAction:e.defaultEventAction});
}}},handleEvent:function(d,c,b,a){a.lastKeyEvent=c;return b.call(this,c);},destroy:function(b){var a=this;if(b){Ext.raise("removeEl argument in KeyNav destructor is not supported anymore.");}if(a.destroyKeyMap){a.map.destroy(b);}a.map=null;a.callParent();},enable:function(){if(this.map){this.map.enable();
this.disabled=false;}},disable:function(){if(this.map){this.map.disable();}this.disabled=true;},setDisabled:function(a){this.map.setDisabled(a);this.disabled=a;},isEnabled:function(){return !this.disabled;},getKeyEvent:function(b,a){if(b||(Ext.supports.SpecialKeyDownRepeat&&!a)){return"keydown";}else{return a||this.eventName;
}}});