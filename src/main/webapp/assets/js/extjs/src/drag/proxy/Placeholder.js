Ext.define("Ext.drag.proxy.Placeholder",{extend:"Ext.drag.proxy.None",alias:"drag.proxy.placeholder",config:{cls:"",cursorOffset:[12,20],html:null,invalidCls:"",validCls:""},placeholderCls:Ext.baseCSSPrefix+"drag-proxy-placeholder",cleanup:function(){this.element=Ext.destroy(this.element);},getElement:function(){var a=Ext.getBody().createChild({cls:this.getCls(),html:this.getHtml()});
a.addCls(this.placeholderCls);a.setTouchAction({panX:false,panY:false});return a;},update:function(e){var c=this.element,b=this.getInvalidCls(),a=this.getValidCls(),d=e.valid;if(e.target){c.replaceCls(d?b:a,d?a:b);}else{c.removeCls([b,a]);}},updateCls:function(a,c){var b=this.element;if(b){if(c){b.removeCls(c);
}if(a){b.addCls(a);}}},updateHtml:function(a){var b=this.element;if(b){b.setHtml(a||"");}},updateInvalidCls:function(a,b){this.doUpdateCls(a,b);},updateValidCls:function(a,b){this.doUpdateCls(a,b);},destroy:function(){this.element=Ext.destroy(this.element);this.callParent();},privates:{adjustCursorOffset:function(b,a){var c=this.getCursorOffset();
if(c){a[0]+=(c[0]||0);a[1]+=(c[1]||0);}return a;},doUpdateCls:function(b,d){var c=this.element,a;if(c){if(d){a=b&&c.hasCls(d);c.removeCls(d);}if(b&&a){c.addCls(b);}}}}});