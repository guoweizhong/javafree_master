Ext.define("Ext.util.translatable.Dom",{extend:"Ext.util.translatable.Abstract",alias:"translatable.dom",config:{element:null},applyElement:function(a){if(!a){return;}return Ext.get(a);},updateElement:function(){this.refresh();}});