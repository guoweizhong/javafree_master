Ext.define("Ext.data.ResultSet",{isResultSet:true,$configPrefixed:false,config:{loaded:true,count:null,total:null,remoteTotal:null,success:false,records:null,message:null,metadata:null,groupData:null,summaryData:null},constructor:function(a){this.initConfig(a);},getCount:function(){var b=this.callParent(),a;
if(!b){a=this.getRecords();if(a){b=a.length;}}return b;}});