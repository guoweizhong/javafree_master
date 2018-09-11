Ext.define("Ext.drag.Item",{mixins:["Ext.mixin.Observable","Ext.mixin.Identifiable"],config:{autoDestroy:true,component:null,element:null,groups:null},constructor:function(a){this.mixins.observable.constructor.call(this,a);},isDisabled:function(){return this.disabled;},disable:function(){this.disabled=true;
},enable:function(){this.disabled=false;},updateComponent:function(a,c){var b;if(a){b=a.el;}else{if(c&&c.el===this.getElement()){b=null;}else{return;}}this.setElement(b);},applyElement:function(a){return a?Ext.get(a):null;},updateElement:function(){this.setupListeners();},applyGroups:function(a){if(typeof a==="string"){a=[a];
}return a;},destroy:function(){var b=this,a=b.getElement();b.destroying=true;b.setElement(null);if(a&&b.getAutoDestroy()){a.destroy();}b.callParent();b.destroying=false;},privates:{disabled:false,convertToLocalXY:function(a){var b=this.getComponent();if(b){a=b.convertToLocalXY(a);}else{a=this.getElement().translateXY(a[0],a[1]);
a=[a.x,a.y];}return a;},getElListeners:Ext.privateFn,setupListeners:function(a){var b=this,c=b.elListeners;a=a||b.getElement();if(c){c.destroy();b.elListeners=null;}if(a){b.elListeners=a.on(Ext.apply({scope:b,destroyable:true},b.getElListeners()));}}}});