Ext.define("Ext.dom.Underlay",{requires:["Ext.dom.UnderlayPool"],constructor:function(a){Ext.apply(this,a);},beforeShow:Ext.emptyFn,getInsertionTarget:function(){return this.target;},getPool:function(){return this.pool||(this.self.prototype.pool=new Ext.dom.UnderlayPool(this.elementConfig));},hide:function(){var b=this,a=b.el;
if(a){if(a.dom){a.hide();b.getPool().checkIn(a);}b.el=null;}b.hidden=true;},realign:function(h,g,a,i){var e=this,b=e.el,d=e.target,c=e.offsets,f=Math.max;if(b){if(h==null){h=d.getX();}if(g==null){g=d.getY();}if(a==null){a=d.getWidth();}if(i==null){i=d.getHeight();}if(c){h=h+c.x;g=g+c.y;a=f(a+c.w,0);i=f(i+c.h,0);
}b.setXY([h,g]);b.setSize(a,i);}},setZIndex:function(a){this.zIndex=a;if(this.el){this.el.setStyle("z-index",a);}},show:function(){var b=this,d=b.target,f=b.zIndex,a=b.el,c=b.getInsertionTarget().dom,e;if(!a){a=b.el=b.getPool().checkOut();}b.beforeShow();if(f==null){f=(parseInt(d.getStyle("z-index"),10));
}if(f){a.setStyle("z-index",f);}a.setStyle("position",b.fixed?"fixed":"");e=a.dom;if(e.nextSibling!==c){d.dom.parentNode.insertBefore(e,c);}a.show();b.realign();b.hidden=false;}});