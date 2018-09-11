<%@ page contentType="text/html; charset=UTF-8" %><script type="text/javascript">var current_groupids="${param.current_groupids}";var parentWinGridPanel_dept=Ext.getCmp("${param.parentWinGridPanelID_dept}");var parentWinGridPanel_role=Ext.getCmp("${param.parentWinGridPanelID_role}");var parentWinGridPanel_user=Ext.getCmp("${param.parentWinGridPanelID_user}");var parentWinGridPanel_tab=Ext.getCmp("${param.parentWinGridPanelID_tab}");var selectUserWin=Ext.getCmp("${param.popupwinid}");Ext.require(["Ext.data.*","Ext.grid.*","Ext.tree.*","Ext.form.ComboBox","Ext.util.*","Ext.grid.plugin.BufferedRenderer","Ext.toolbar.Paging","Ext.ux.ProgressBarPager","Ext.ux.form.SearchField","Ext.ux.CheckColumn"]);var ICONPATH=javafree.CONTEXTPATH+"/assets/images/";Ext.onReady(function(){var s=50;var B=javafree.CONTEXTPATH+"/identity/user/doGetUserByDeptIdGridJson";var l=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"displayName",type:"string"},{name:"email",type:"string"},{name:"enabled",type:"string"},{name:"createDate",type:"string"},{name:"mobile",type:"string"},{name:"orgcode",type:"string"},{name:"sn",type:"int"}],pageSize:s,proxy:{type:"jsonp",enablePaging:true,url:B,reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:false,remoteSort:true,sorters:{property:"sn",direction:"ASC"}});var f=javafree.CONTEXTPATH+"/identity/department/doGetDepartmentTreeJson?forType=userList";var y=Ext.create("Ext.data.TreeStore",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"type",type:"string"},{name:"orgcode",type:"string"},{name:"sn",type:"int"}],proxy:{type:"ajax",url:f},folderSort:false});y.sort({property:"sn",direction:"ASC"},"prepend",false);var v=[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-expand.png",text:"展开",scope:this,handler:function(){q.getEl().mask("正在展开...");q.expandAll(function(){q.getEl().unmask()})}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-collapse.png",text:"折叠",handler:function(){q.collapseAll()}}];var q=Ext.create("Ext.tree.Panel",{title:"",tbar:v,useArrows:false,rootVisible:false,store:y,multiSelect:true,forceFit:true,columns:[{xtype:"treecolumn",text:"机构树",width:480,sortable:true,dataIndex:"name"}],listeners:{itemclick:function(D,C,G,E,H,F){Ext.apply(l.proxy.extraParams,{deptid:C.data.id});l.load({params:{start:0,limit:s}})}}});var c=Ext.create("Ext.data.Store",{fields:["value","name"],data:[{value:"displayName",name:"用户名称"},{value:"name",name:"登录帐号"},{value:"mobile",name:"电话"},{value:"email",name:"邮箱"}]});var d=[{fieldLabel:"查询",labelWidth:30,id:"fieldName_userlist",xtype:"combobox",emptyText:"选择字段",name:"fieldName_userlist",displayField:"name",valueField:"value",width:140,store:c,queryMode:"local",listeners:{select:function(){Ext.apply(l.proxy.extraParams,{fieldName:Ext.getCmp("fieldName_userlist").getValue()})}},fieldStyle:"border-right: 0px!important;border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;"},{width:140,fieldLabel:"查询",emptyText:"输入字段值...",hideLabel:true,labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:l},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/accept.png",text:"确定选择",handler:function(){p()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"关闭窗口",handler:function(){if(selectUserWin){selectUserWin.close()}}}];function p(){var F=n.getSelectionModel().getSelection();if(F.length>0){var E=[],D=[];var G=[];for(var I=0,K=F.length;I<K;I++){E.push(F[I].get("id"));D.push(F[I].get("displayName")+"("+F[I].get("name")+")");G.push(F[I].get("orgcode"))}var H=D.toString();var L=E.toString();var J="U";var C=javafree.CONTEXTPATH+"/identity/groupRelation/doAddGroupRelation";Ext.Ajax.request({url:C,method:"POST",scope:this,params:{groupids:current_groupids,relType:J,orgcodes:G.toString(),relationids:L,relationNames:H},success:function(M){var N=Ext.JSON.decode(M.responseText);if(N.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:N.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){if(parentWinGridPanel_user){parentWinGridPanel_user.store.load({callback:function(P,O,R){if(R){var Q=0;if(parentWinGridPanel_tab){parentWinGridPanel_tab.items.each(function(S){++Q;if(Q==1){S.setTitle("用户("+P.length+")")}})}}}})}}})}else{Ext.MessageBox.show({title:"错误提示:",msg:N.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}},failure:function(M){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}}var t=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});var n=Ext.create("Ext.grid.Panel",{title:"",tbar:d,selModel:t,multiSelect:true,forceFit:true,store:l,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{id:"id",header:"用户名称",dataIndex:"displayName",width:150},{header:"帐号",dataIndex:"name",width:130},{header:"邮箱",dataIndex:"email",hidden:true,width:160},{header:"机构编码",dataIndex:"orgcode",width:100},{header:"电话",dataIndex:"mobile",hidden:true,width:160}],bbar:{xtype:"pagingtoolbar",store:l,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});var u=Ext.create("Ext.panel.Panel",{layout:{type:"border"},defaults:{split:true},items:[{region:"west",title:"",split:true,width:"30%",border:false,minWidth:100,maxSize:400,autoScroll:true,layout:"fit",items:q},{region:"center",width:"70%",border:false,minWidth:100,maxSize:500,split:true,autoScroll:true,layout:"fit",floatable:true,items:n}]});var w=javafree.CONTEXTPATH+"/identity/department/doGetDepartmentTreeJson";var A=Ext.create("Ext.data.TreeStore",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"type",type:"string"},{name:"sn",type:"int"}],proxy:{type:"ajax",url:w},folderSort:true});A.sort({property:"sn",direction:"ASC"},"prepend",false);var h=[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-expand.png",text:"",scope:this,handler:function(){g.getEl().mask("正在展开...");g.expandAll(function(){g.getEl().unmask()})}},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-collapse.png",text:"",handler:function(){g.collapseAll()}},"-",{width:220,fieldLabel:"",emptyText:"机构/部门名称...",labelWidth:0,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:A},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/accept.png",text:"确定选择",handler:function(){z()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"关闭窗口",handler:function(){if(selectUserWin){selectUserWin.close()}}}];function z(){var F=g.getSelectionModel().getSelection();if(F.length>0){var E=[],D=[];var G=[];for(var I=0,K=F.length;I<K;I++){E.push(F[I].get("id"));D.push(F[I].get("name"));G.push(F[I].get("orgcode"))}var H=D.toString();var L=E.toString();var J="D";var C=javafree.CONTEXTPATH+"/identity/groupRelation/doAddGroupRelation";Ext.Ajax.request({url:C,method:"POST",scope:this,params:{groupids:current_groupids,relType:J,orgcodes:G.toString(),relationids:L,relationNames:H},success:function(M){var N=Ext.JSON.decode(M.responseText);if(N.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:N.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){if(parentWinGridPanel_dept){parentWinGridPanel_dept.store.load({callback:function(P,O,R){if(R){var Q=0;if(parentWinGridPanel_tab){parentWinGridPanel_tab.items.each(function(S){++Q;if(Q==2){S.setTitle("机构/部门("+P.length+")")}})}}}})}}})}else{Ext.MessageBox.show({title:"错误提示:",msg:N.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}},failure:function(M){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}}var x=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});function j(D,E,C){if(D=="ORG"){return"机构"}else{return"部门"}}var g=Ext.create("Ext.tree.Panel",{title:"",tbar:h,useArrows:false,rootVisible:false,store:A,selModel:x,multiSelect:true,forceFit:true,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{xtype:"treecolumn",text:"名称",width:340,sortable:true,dataIndex:"name"},{text:"类型",width:70,sortable:true,renderer:j,dataIndex:"type"},{header:"机构编码",dataIndex:"orgcode",width:100},{text:"最近修改时间",width:150,sortable:true,hidden:true,align:"center",dataIndex:"createDate"},{text:"次序号",width:70,hidden:true,sortable:true,align:"center",dataIndex:"sn"}]});var r=javafree.CONTEXTPATH+"/identity/role/doGetRoleGridJson?scopeType=PRIVATE";var k=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"note",type:"string"},{name:"createDate",type:"string"},{name:"orgcode",type:"string"},{name:"scopetype",type:"string"},{name:"sn",type:"int"}],pageSize:s,proxy:{type:"jsonp",enablePaging:true,url:r,reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:true,remoteSort:true,groupField:"note",sorters:{property:"note",direction:"DESC"}});var e=[{width:220,fieldLabel:"查询",emptyText:"角色名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:k},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/accept.png",text:"确定选择",handler:function(){o()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"关闭窗口",handler:function(){if(selectUserWin){selectUserWin.close()}}}];function o(){var F=i.getSelectionModel().getSelection();if(F.length>0){var E=[],D=[];var G=[];for(var I=0,K=F.length;I<K;I++){E.push(F[I].get("id"));D.push(F[I].get("name"));G.push(F[I].get("orgcode"))}var H=D.toString();var L=E.toString();var J="R";var C=javafree.CONTEXTPATH+"/identity/groupRelation/doAddGroupRelation";Ext.Ajax.request({url:C,method:"POST",scope:this,params:{groupids:current_groupids,relType:J,orgcodes:G.toString(),relationids:L,relationNames:H},success:function(M){var N=Ext.JSON.decode(M.responseText);if(N.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:N.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){if(parentWinGridPanel_role){parentWinGridPanel_role.store.load({callback:function(P,O,R){if(R){var Q=0;if(parentWinGridPanel_tab){parentWinGridPanel_tab.items.each(function(S){++Q;if(Q==3){S.setTitle("角色("+P.length+")")}})}}}})}}})}else{Ext.MessageBox.show({title:"错误提示:",msg:N.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}},failure:function(M){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}}var b=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});function m(D,E,C){if(D=="PUBLIC"){return"公共"}else{return"私有"}}var i=Ext.create("Ext.grid.Panel",{title:"",tbar:e,selModel:b,multiSelect:true,forceFit:true,store:k,features:[{id:"group",ftype:"grouping",groupHeaderTpl:'<font style="font-weight:bold" color="#00008b">{name}</font><font color="red"> ({rows.length})</font>'}],columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"角色名称",dataIndex:"name",width:200},{header:"机构编码",width:120,sortable:true,dataIndex:"orgcode"},{header:"适用范围",width:100,sortable:true,align:"center",renderer:m,dataIndex:"scopetype"},{header:"次序号",dataIndex:"sn",sortable:true,align:"center",width:70}],bbar:{xtype:"pagingtoolbar",store:k,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});var a=Ext.widget("tabpanel",{activeTab:0,tabPosition:"top",items:[{title:"选择用户",iconCls:"btn-icon-md  orange2 fa fa-user",layout:"fit",items:u},{title:"选择部门",iconCls:"btn-icon-md  orange2 fa fa-sitemap",layout:"fit",items:g},{title:"选择角色",iconCls:"btn-icon-md  orange2 fa fa-child",layout:"fit",items:i}]});if(selectUserWin){selectUserWin.removeAll();selectUserWin.add(a)}});</script>