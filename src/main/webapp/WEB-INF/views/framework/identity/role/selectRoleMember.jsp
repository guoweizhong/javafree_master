<%@ page contentType="text/html; charset=UTF-8" %><script type="text/javascript">var current_roleids="${param.current_roleids}";var selectRoleMemberParentWinGridPanel=Ext.getCmp("${param.parentWinGridPanelID}");var selectRoleMemberWin=Ext.getCmp("${param.popupwinid}");Ext.require(["Ext.data.*","Ext.grid.*","Ext.tree.*","Ext.form.ComboBox","Ext.util.*","Ext.grid.plugin.BufferedRenderer","Ext.toolbar.Paging","Ext.ux.ProgressBarPager","Ext.ux.form.SearchField","Ext.ux.CheckColumn"]);var ICONPATH=javafree.CONTEXTPATH+"/assets/images/";Ext.onReady(function(){var k=50;var l=javafree.CONTEXTPATH+"/identity/department/doGetDepartmentTreeJson?forType=userList";var t=Ext.create("Ext.data.TreeStore",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"type",type:"string"},{name:"sn",type:"int"}],proxy:{type:"ajax",url:l},folderSort:false});t.sort({property:"sn",direction:"ASC"},"prepend",false);var i=javafree.CONTEXTPATH+"/identity/user/doGetUserByDeptIdGridJson";var j=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"displayName",type:"string"},{name:"email",type:"string"},{name:"enabled",type:"string"},{name:"createDate",type:"string"},{name:"mobile",type:"string"},{name:"orgcode",type:"string"},{name:"sn",type:"int"}],pageSize:k,proxy:{type:"jsonp",enablePaging:true,url:i,reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:false,remoteSort:true,sorters:{property:"sn",direction:"ASC"}});var m=[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-expand.png",text:"展开",scope:this,handler:function(){c.getEl().mask("正在展开...");c.expandAll(function(){c.getEl().unmask()})}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-collapse.png",text:"折叠",handler:function(){c.collapseAll()}}];var c=Ext.create("Ext.tree.Panel",{title:"",tbar:m,useArrows:false,rootVisible:false,store:t,multiSelect:true,forceFit:true,columns:[{xtype:"treecolumn",text:"机构树",width:380,sortable:true,dataIndex:"name"}],listeners:{itemclick:function(v,u,y,w,z,x){Ext.apply(j.proxy.extraParams,{deptid:u.data.id});j.load({params:{start:0,limit:k}})}}});var b=Ext.create("Ext.data.Store",{fields:["value","name"],data:[{value:"displayName",name:"用户名称"},{value:"name",name:"登录帐号"},{value:"mobile",name:"电话"},{value:"email",name:"邮箱"}]});var p=[{fieldLabel:"查询",labelWidth:30,id:"fieldName_userlist",xtype:"combobox",emptyText:"选择字段",name:"fieldName_userlist",displayField:"name",valueField:"value",width:140,store:b,queryMode:"local",listeners:{select:function(){Ext.apply(j.proxy.extraParams,{fieldName:Ext.getCmp("fieldName_userlist").getValue()})}},fieldStyle:"border-right: 0px!important;border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;"},{width:140,fieldLabel:"查询",emptyText:"输入字段值...",hideLabel:true,labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:j}];var a=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});var r=Ext.create("Ext.grid.Panel",{title:"",tbar:p,selModel:a,multiSelect:true,forceFit:true,store:j,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"用户名称",dataIndex:"displayName",width:120},{header:"帐号",dataIndex:"name",width:120},{header:"机构编码",dataIndex:"orgcode",hidden:true,width:100}],bbar:{xtype:"pagingtoolbar",store:j,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});var n=javafree.CONTEXTPATH+"/identity/department/doGetDepartmentTreeJson";var s=Ext.create("Ext.data.TreeStore",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"type",type:"string"},{name:"orgcode",type:"string"},{name:"sn",type:"int"}],proxy:{type:"ajax",url:n},folderSort:true});s.sort({property:"sn",direction:"ASC"},"prepend",false);var g=[{width:150,fieldLabel:"",emptyText:"机构/部门名称...",labelWidth:0,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:s},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/accept.png",text:"确定选择",handler:function(){d()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"关闭窗口",handler:function(){if(selectRoleMemberWin){selectRoleMemberWin.close()}}}];function d(){var A=r.getSelectionModel().getSelection();var v=f.getSelectionModel().getSelection();if(current_roleids&&current_roleids.length>1){if(A.length>0&&v.length>0){var y=[],C=[],B=[],x=[];for(var w=0,z=A.length;w<z;w++){y.push(A[w].get("id"));C.push(A[w].get("displayName"))}for(var w=0,z=v.length;w<z;w++){B.push(v[w].get("id"));x.push(v[w].get("name"))}var u=javafree.CONTEXTPATH+"/identity/membership/doAddMembershipFromRole";Ext.Ajax.request({url:u,method:"POST",scope:this,params:{current_roleids:current_roleids,userids:y.toString(),userNames:C.toString(),deptids:B.toString(),deptNames:x.toString()},success:function(D){var E=Ext.JSON.decode(D.responseText);if(E.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:E.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){if(selectRoleMemberParentWinGridPanel){selectRoleMemberParentWinGridPanel.store.load()}}})}else{Ext.MessageBox.show({title:"错误提示:",msg:E.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}},failure:function(D){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}else{Ext.MessageBox.show({title:"错误提示:",msg:"需要同时选择用户和部门后才能提交!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}}else{Ext.MessageBox.show({title:"错误提示:",msg:"没有获得到机构信息,请返回主界面选择!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}}var o=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});function h(v,w,u){if(v=="ORG"){return"机构"}else{return"部门"}}var f=Ext.create("Ext.tree.Panel",{title:"",tbar:g,useArrows:false,rootVisible:false,store:s,selModel:o,multiSelect:true,forceFit:true,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{xtype:"treecolumn",text:"名称",width:340,sortable:true,dataIndex:"name"},{text:"类型",width:70,renderer:h,hidden:true,dataIndex:"type"},{text:"机构编码",width:100,sortable:true,hidden:true,dataIndex:"orgcode"},{text:"次序号",width:70,sortable:true,align:"center",hidden:true,dataIndex:"sn"}]});var q=Ext.create("Ext.panel.Panel",{layout:{type:"border"},style:{},defaults:{split:true},items:[{region:"west",title:"",split:false,width:"35%",border:true,minWidth:100,maxSize:400,autoScroll:true,layout:"fit",items:c},{region:"center",width:"65%",style:{borderLeft:"1px solid #cecece"},border:false,minWidth:200,maxSize:500,split:false,autoScroll:true,layout:"fit",items:r}]});var e=Ext.create("Ext.panel.Panel",{layout:{type:"border"},style:{borderTop:"1px solid #cecece"},items:[{region:"west",title:"第一步：选择用户",split:false,width:"58%",border:false,minWidth:200,maxSize:400,autoScroll:true,layout:"fit",items:q},{title:"第二步：选择机构/部门",region:"center",width:"42%",border:false,style:{borderLeft:"2px solid #cecece"},minWidth:200,maxSize:500,split:false,autoScroll:true,layout:"fit",floatable:true,items:f}]});if(selectRoleMemberWin){selectRoleMemberWin.removeAll();selectRoleMemberWin.add(e)}});</script>