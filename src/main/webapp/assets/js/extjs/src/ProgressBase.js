Ext.define("Ext.ProgressBase",{mixinId:"progressbase",config:{value:0,textTpl:null},applyTextTpl:function(a){if(!a.isTemplate){a=new Ext.XTemplate(a);}return a;},applyValue:function(a){return a||0;}});