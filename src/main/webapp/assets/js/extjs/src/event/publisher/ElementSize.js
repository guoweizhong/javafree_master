Ext.define("Ext.event.publisher.ElementSize",{extend:"Ext.event.publisher.Publisher",requires:["Ext.util.SizeMonitor"],type:"size",handledEvents:["resize"],constructor:function(){this.monitors={};this.subscribers={};this.callParent(arguments);},subscribe:function(b){var d=b.id,c=this.subscribers,a=this.monitors;
if(c[d]){++c[d];}else{c[d]=1;a[d]=new Ext.util.SizeMonitor({element:b,callback:this.onElementResize,scope:this,args:[b]});}b.on("painted","forceRefresh",a[d]);return true;},unsubscribe:function(c){var e=c.id,d=this.subscribers,b=this.monitors,a;if(d[e]&&!--d[e]){delete d[e];a=b[e];c.un("painted","forceRefresh",a);
a.destroy();delete b[e];}if(c.activeRead){Ext.TaskQueue.cancelRead(c.activeRead);}},fireElementResize:function(a,b){delete a.activeRead;this.fire(a,"resize",[a,b]);},onElementResize:function(a,b){if(!a.activeRead){a.activeRead=Ext.TaskQueue.requestRead("fireElementResize",this,[a,b],!!a.$skipResourceCheck);
}},privates:{syncRefresh:function(e){e=Ext.Array.from(e);var b=e.length,c=0,d,a;for(c=0;c<b;++c){d=e[c];if(typeof d!=="string"){d=d.id;}a=this.monitors[d];if(a){a.forceRefresh();}}Ext.TaskQueue.flush();}}},function(a){a.instance=new a();});