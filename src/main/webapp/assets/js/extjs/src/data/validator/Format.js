Ext.define("Ext.data.validator.Format",{extend:"Ext.data.validator.Validator",alias:"data.validator.format",type:"format",config:{message:"Is in the wrong format",matcher:undefined},constructor:function(){this.callParent(arguments);if(!this.getMatcher()){Ext.raise("validator.Format must be configured with a matcher");
}},validate:function(b){var c=this.getMatcher(),a=c&&c.test(b);return a?a:this.getMessage();}});