Ext.define("Ext.data.validator.DateTime",{extend:"Ext.data.validator.AbstractDate",alias:"data.validator.datetime",type:"datetime",message:"Is not a valid date and time",privates:{getDefaultFormat:function(){var a=Ext.Date;return a.defaultFormat+" "+a.defaultTimeFormat;}}});