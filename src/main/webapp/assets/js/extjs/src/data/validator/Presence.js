Ext.define("Ext.data.validator.Presence",{extend:"Ext.data.validator.Validator",alias:"data.validator.presence",type:"presence",isPresence:true,config:{message:"Must be present",allowEmpty:false},validate:function(b){var a=!(b===undefined||b===null);if(a&&!this.getAllowEmpty()){a=b!=="";}return a?true:this.getMessage();
}});