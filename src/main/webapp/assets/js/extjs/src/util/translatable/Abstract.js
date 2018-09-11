Ext.define("Ext.util.translatable.Abstract",{extend:"Ext.Evented",mixins:["Ext.mixin.Factoryable"],factoryConfig:{type:"translatable",defaultType:"csstransform"},requires:["Ext.fx.easing.Linear"],config:{easing:null,easingX:{duration:300},easingY:{duration:300}},x:0,y:0,activeEasingX:null,activeEasingY:null,isAnimating:false,isTranslatable:true,constructor:function(a){this.callParent([a]);
this.position={x:0,y:0};},factoryEasing:function(a){return Ext.factory(a,Ext.fx.easing.Linear,null,"easing");},applyEasing:function(a){if(!this.getEasingX()){this.setEasingX(this.factoryEasing(a));}if(!this.getEasingY()){this.setEasingY(this.factoryEasing(a));}},applyEasingX:function(a){return this.factoryEasing(a);
},applyEasingY:function(a){return this.factoryEasing(a);},doTranslate:function(a,b){if(this.hasListeners.translate){this.fireEvent("translate",this,a,b);}},translate:function(a,c,b){if(b){return this.translateAnimated(a,c,b);}if(this.isAnimating){this.stopAnimation();}if(!isNaN(a)&&typeof a==="number"){this.x=a;
}if(!isNaN(c)&&typeof c==="number"){this.y=c;}this.doTranslate(a,c);},translateAxis:function(b,d,c){var a,e;if(b==="x"){a=d;}else{e=d;}return this.translate(a,e,c);},getPosition:function(){var b=this,a=b.position;a.x=-b.x;a.y=-b.y;return a;},animate:function(b,a){this.activeEasingX=b;this.activeEasingY=a;
this.isAnimating=true;this.lastX=null;this.lastY=null;Ext.AnimationQueue.start(this.doAnimationFrame,this);this.fireEvent("animationstart",this,this.x,this.y);return this;},translateAnimated:function(b,h,f){var e=this,d,g,c,a;if(!Ext.isObject(f)){f={};}if(e.isAnimating){e.stopAnimation();}e.callback=f.callback;
e.callbackScope=f.scope;d=Ext.Date.now();g=f.easing;c=(typeof b==="number")?(f.easingX||g||e.getEasingX()||true):null;a=(typeof h==="number")?(f.easingY||g||e.getEasingY()||true):null;if(c){c=e.factoryEasing(c);c.setStartTime(d);c.setStartValue(e.x);c.setEndValue(b);if("duration" in f){c.setDuration(f.duration);
}}if(a){a=e.factoryEasing(a);a.setStartTime(d);a.setStartValue(e.y);a.setEndValue(h);if("duration" in f){a.setDuration(f.duration);}}return e.animate(c,a);},doAnimationFrame:function(){var e=this,c=e.activeEasingX,b=e.activeEasingY,d=Date.now(),a,f;if(!e.isAnimating){return;}e.lastRun=d;if(c===null&&b===null){e.stopAnimation();
return;}if(c!==null){e.x=a=Math.round(c.getValue());if(c.isEnded){e.activeEasingX=null;e.fireEvent("axisanimationend",e,"x",a);}}else{a=e.x;}if(b!==null){e.y=f=Math.round(b.getValue());if(b.isEnded){e.activeEasingY=null;e.fireEvent("axisanimationend",e,"y",f);}}else{f=e.y;}if(e.lastX!==a||e.lastY!==f){e.doTranslate(a,f);
e.lastX=a;e.lastY=f;}e.fireEvent("animationframe",e,a,f);},stopAnimation:function(){var a=this;if(!a.isAnimating){return;}a.activeEasingX=null;a.activeEasingY=null;a.isAnimating=false;Ext.AnimationQueue.stop(a.doAnimationFrame,a);a.fireEvent("animationend",a,a.x,a.y);if(a.callback){a.callback.call(a.callbackScope);
a.callback=null;}},refresh:function(){this.translate(this.x,this.y);},resolveListenerScope:function(){var c=this.ownerCmp,b=arguments;if(c){return c.resolveListenerScope.apply(c,b);}return this.callParent(b);},destroy:function(){var a=this;a.destroying=true;if(a.isAnimating){a.stopAnimation();}a.callParent();
a.destroying=false;a.destroyed=true;}});