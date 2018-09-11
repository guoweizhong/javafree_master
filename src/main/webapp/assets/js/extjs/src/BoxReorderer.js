Ext.define("Ext.ux.BoxReorderer",{extend:"Ext.plugin.Abstract",alias:"plugin.boxreorderer",requires:["Ext.dd.DD"],mixins:{observable:"Ext.util.Observable"},itemSelector:".x-box-item",animate:100,constructor:function(){this.callParent(arguments);this.mixins.observable.constructor.call(this);},init:function(a){var c=this,b=a.getLayout();
c.container=a;c.names=b._props[b.type].names;c.animatePolicy={};c.animatePolicy[c.names.x]=true;c.container.on({scope:c,boxready:c.onBoxReady,beforedestroy:c.onContainerDestroy});},onContainerDestroy:function(){var a=this.dd;if(a){a.unreg();this.dd=null;}},onBoxReady:function(){var c=this,b=c.container.getLayout(),d=c.names,a;
a=c.dd=new Ext.dd.DD(b.innerCt,c.container.id+"-reorderer");Ext.apply(a,{animate:c.animate,reorderer:c,container:c.container,getDragCmp:c.getDragCmp,clickValidator:Ext.Function.createInterceptor(a.clickValidator,c.clickValidator,c,false),onMouseDown:c.onMouseDown,startDrag:c.startDrag,onDrag:c.onDrag,endDrag:c.endDrag,getNewIndex:c.getNewIndex,doSwap:c.doSwap,findReorderable:c.findReorderable,names:d});
a.dim=d.width;a.startAttr=d.beforeX;a.endAttr=d.afterX;},getDragCmp:function(a){return this.container.getChildByElement(a.getTarget(this.itemSelector,10));},clickValidator:function(b){var a=this.getDragCmp(b);return !!(a&&a.reorderable!==false);},onMouseDown:function(g){var f=this,a=f.container,d,b,c;
f.dragCmp=f.getDragCmp(g);if(f.dragCmp){b=f.dragCmp.getEl();f.startIndex=f.curIndex=a.items.indexOf(f.dragCmp);c=b.getBox();f.lastPos=c[f.startAttr];d=a.el.getBox();if(f.dim==="width"){f.minX=d.left;f.maxX=d.right-c.width;f.minY=f.maxY=c.top;f.deltaX=g.getX()-c.left;}else{f.minY=d.top;f.maxY=d.bottom-c.height;
f.minX=f.maxX=c.left;f.deltaY=g.getY()-c.top;}f.constrainY=f.constrainX=true;}},startDrag:function(){var b=this,a=b.dragCmp;if(a){a.setPosition=Ext.emptyFn;a.animate=false;if(b.animate){b.container.getLayout().animatePolicy=b.reorderer.animatePolicy;}b.dragElId=a.getEl().id;b.reorderer.fireEvent("StartDrag",b,b.container,a,b.curIndex);
a.suspendEvents();a.disabled=true;a.el.setStyle("zIndex",100);}else{b.dragElId=null;}},findReorderable:function(c){var d=this,a=d.container.items,b;if(a.getAt(c).reorderable===false){b=a.getAt(c);if(c>d.startIndex){while(b&&b.reorderable===false){c++;b=a.getAt(c);}}else{while(b&&b.reorderable===false){c--;
b=a.getAt(c);}}}c=Math.min(Math.max(c,0),a.getCount()-1);if(a.getAt(c).reorderable===false){return -1;}return c;},doSwap:function(d){var e=this,b=e.container.items,a=e.container,g,c,f;d=e.findReorderable(d);if(d===-1||d===e.curIndex){return;}e.reorderer.fireEvent("ChangeIndex",e,a,e.dragCmp,e.startIndex,d);
g=b.getAt(e.curIndex);c=b.getAt(d);b.remove(g);f=Math.min(Math.max(d,0),b.getCount()-1);b.insert(f,g);b.remove(c);b.insert(e.curIndex,c);a.updateLayout({isRoot:true});e.curIndex=d;},onDrag:function(c){var b=this,a;a=b.getNewIndex(c.getPoint());if((a!==undefined)){b.reorderer.fireEvent("Drag",b,b.container,b.dragCmp,b.startIndex,b.curIndex);
b.doSwap(a);}},endDrag:function(d){if(d){d.stopEvent();}var c=this,b=c.container.getLayout(),a;if(c.dragCmp){delete c.dragElId;delete c.dragCmp.setPosition;c.dragCmp.animate=true;c.dragCmp.lastBox[c.names.x]=c.dragCmp.getPosition(true)[c.names.widthIndex];c.container.updateLayout({isRoot:true});a=Ext.fx.Manager.getFxQueue(c.dragCmp.el.id)[0];
if(a){a.on({afteranimate:c.reorderer.afterBoxReflow,scope:c});}else{Ext.asap(c.reorderer.afterBoxReflow,c);}if(c.animate){delete b.animatePolicy;}c.reorderer.fireEvent("drop",c,c.container,c.dragCmp,c.startIndex,c.curIndex);}},afterBoxReflow:function(){var a=this;a.dragCmp.el.setStyle("zIndex","");a.dragCmp.disabled=false;
a.dragCmp.resumeEvents();},getNewIndex:function(h){var g=this,a=g.getDragEl(),b=Ext.fly(a).getBox(),l,f,k,d=0,c=g.container.items.items,e=c.length,j=g.lastPos;g.lastPos=b[g.startAttr];for(;d<e;d++){l=c[d].getEl();if(l.dom!==a&&l.is(g.reorderer.itemSelector)){f=l.getBox();k=f[g.startAttr]+(f[g.dim]>>1);
if(d<g.curIndex){if((b[g.startAttr]<j)&&(b[g.startAttr]<(k-5))){return d;}}else{if(d>g.curIndex){if((b[g.startAttr]>j)&&(b[g.endAttr]>(k+5))){return d;}}}}}}});