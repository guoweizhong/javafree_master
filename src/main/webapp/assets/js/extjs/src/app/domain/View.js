Ext.define("Ext.app.domain.View",{extend:"Ext.app.EventDomain",requires:["Ext.Widget"],isInstance:true,constructor:function(a){this.callParent([a]);this.controller=a;this.monitoredClasses=[Ext.Widget];},match:function(d,a,b){var c=false;if(a==="#"){c=b===d.getController();}else{c=d.is(a);}return c;},destroy:function(){this.controller=null;
this.callParent();}});