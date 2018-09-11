Ext.define("Ext.direct.Provider",{alias:"direct.provider",mixins:["Ext.mixin.Observable"],requires:["Ext.direct.Manager"],isProvider:true,$configPrefixed:false,$configStrict:false,config:{headers:undefined},subscribers:0,constructor:function(a){var b=this;b.mixins.observable.constructor.call(b,a);b.requests={};
Ext.applyIf(b,{id:Ext.id(null,"provider-")});},destroy:function(){var a=this;a.disconnect(true);a.callParent();},isConnected:function(){return this.subscribers>0;},connect:function(){var a=this;if(a.subscribers===0){a.doConnect();a.fireEventArgs("connect",[a]);}a.subscribers++;},doConnect:Ext.emptyFn,disconnect:function(b){var a=this;
if(a.subscribers>0||b){if(b){a.subscribers=0;}else{a.subscribers--;}if(a.subscribers===0){a.doDisconnect();a.fireEventArgs("disconnect",[a]);}}},doDisconnect:function(){var c=this.requests,a,b;for(b in c){a=c[b];a.abort();}this.requests={};},sendAjaxRequest:function(b){var a=Ext.Ajax.request(b);if(a&&a.id){this.requests[a.id]=a;
}return a;},onData:function(b,c,a){if(a&&a.request){delete this.requests[a.request.id];}},inheritableStatics:{checkConfig:Ext.returnFalse},onClassExtended:function(b,c,a){if(c.type){Ext.direct.Manager.addProviderClass(c.type,b);}}});