Ext.define("Ext.data.operation.Read",{extend:"Ext.data.operation.Operation",alias:"data.operation.read",action:"read",isReadOperation:true,config:{filters:undefined,sorters:undefined,grouper:undefined,start:undefined,limit:undefined,page:undefined,addRecords:false},doExecute:function(){return this.getProxy().read(this);
},doProcess:Ext.emptyFn,allowWrite:function(){return false;}});