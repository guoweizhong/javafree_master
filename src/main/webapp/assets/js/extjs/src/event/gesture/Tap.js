Ext.define("Ext.event.gesture.Tap",{extend:"Ext.event.gesture.SingleTouch",priority:200,handledEvents:["tap","tapcancel"],config:{moveDistance:8},onTouchStart:function(c){var b=this,a=b.callParent([c]);if(a!==false){b.isStarted=true;b.startPoint=c.changedTouches[0].point;}return a;},onTouchMove:function(c){var b=this,a=c.changedTouches[0].point,d=Ext.Element.getViewportScale(),f=Math.round(Math.abs(a.getDistanceTo(b.startPoint)*d));
if(f>=b.getMoveDistance()){return b.cancel(c);}},onTouchEnd:function(a){this.fire("tap",a,{touch:a.changedTouches[0]});return this.callParent([a]);},onCancel:function(a){this.fire("tapcancel",a,{touch:a.changedTouches[0]},true);},reset:function(){this.startPoint=null;return this.callParent();}},function(b){var a=Ext.manifest.gestures;
b.instance=new b(a&&a.tap);});