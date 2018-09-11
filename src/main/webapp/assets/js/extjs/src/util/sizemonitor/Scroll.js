Ext.define("Ext.util.sizemonitor.Scroll",{extend:"Ext.util.sizemonitor.Abstract",getElementConfig:function(){return{reference:"detectorsContainer",classList:[Ext.baseCSSPrefix+"size-monitors","scroll"],children:[{reference:"expandMonitor",className:"expand"},{reference:"shrinkMonitor",className:"shrink"}]};
},constructor:function(a){this.onScroll=Ext.Function.bind(this.onScroll,this);this.callParent(arguments);},bindListeners:function(b){var a=b?"addEventListener":"removeEventListener";this.expandMonitor[a]("scroll",this.onScroll,true);this.shrinkMonitor[a]("scroll",this.onScroll,true);},forceRefresh:function(){Ext.TaskQueue.requestRead("refresh",this,[true]);
},onScroll:function(){if(!this.destroyed){Ext.TaskQueue.requestRead("refresh",this);}},refreshMonitors:function(){var b=this.expandMonitor,c=this.shrinkMonitor,a=1000000;if(b&&!b.destroyed){b.scrollLeft=a;b.scrollTop=a;}if(c&&!c.destroyed){c.scrollLeft=a;c.scrollTop=a;}},destroy:function(){this.onScroll=null;
this.callParent();}});