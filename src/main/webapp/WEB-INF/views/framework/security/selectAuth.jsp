<%@ page contentType="text/html; charset=UTF-8"%><script type="text/javascript">var current_resids="${param.current_resids}";var parentWinGridPanel_dept=Ext.getCmp("${param.parentWinGridPanelID_dept}");var parentWinGridPanel_role=Ext.getCmp("${param.parentWinGridPanelID_role}");var parentWinGridPanel_user=Ext.getCmp("${param.parentWinGridPanelID_user}");var parentWinGridPanel_group=Ext.getCmp("${param.parentWinGridPanelID_group}");var parentWinGridPanel_org=Ext.getCmp("${param.parentWinGridPanelID_org}");var parentWinGridPanel_tab=Ext.getCmp("${param.parentWinGridPanelID_tab}");var selectAuthWin=Ext.getCmp("${param.popupwinid}");Ext.require(["Ext.data.*","Ext.grid.*","Ext.tree.*","Ext.form.ComboBox","Ext.util.*","Ext.grid.plugin.BufferedRenderer","Ext.toolbar.Paging","Ext.ux.ProgressBarPager","Ext.ux.form.SearchField","Ext.ux.CheckColumn"]);var ICONPATH=javafree.CONTEXTPATH+"/assets/images/";Ext.onReady(function(){var x=50;var v=javafree.CONTEXTPATH+"/identity/user/doGetUserByDeptIdGridJson";var u=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"displayName",type:"string"},{name:"email",type:"string"},{name:"enabled",type:"string"},{name:"createDate",type:"string"},{name:"orgcode",type:"string"},{name:"mobile",type:"string"},{name:"sn",type:"int"}],pageSize:x,proxy:{type:"jsonp",enablePaging:true,url:v,reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:false,remoteSort:true,sorters:{property:"sn",direction:"ASC"}});var D=javafree.CONTEXTPATH+"/identity/department/doGetDepartmentTreeJson?forType=userList";var j=Ext.create("Ext.data.TreeStore",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"type",type:"string"},{name:"orgcode",type:"string"},{name:"sn",type:"int"}],proxy:{type:"ajax",url:D},folderSort:false});j.sort({property:"sn",direction:"ASC"},"prepend",false);var m=[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-expand.png",text:"展开",scope:this,handler:function(){J.getEl().mask("正在展开...");J.expandAll(function(){J.getEl().unmask()})}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-collapse.png",text:"折叠",handler:function(){J.collapseAll()}}];var J=Ext.create("Ext.tree.Panel",{title:"",tbar:m,useArrows:false,rootVisible:false,store:j,multiSelect:true,forceFit:true,columns:[{xtype:"treecolumn",text:"机构树",width:480,sortable:true,dataIndex:"name"}],listeners:{itemclick:function(R,Q,U,S,V,T){Ext.apply(u.proxy.extraParams,{deptid:Q.data.id});u.load({params:{start:0,limit:x}})}}});var s=Ext.create("Ext.data.Store",{fields:["value","name"],data:[{value:"name",name:"登录帐号"},{value:"displayName",name:"用户名称"},{value:"mobile",name:"电话"},{value:"email",name:"邮箱"}]});var B=[{fieldLabel:"查询",labelWidth:30,id:"fieldName_userlist",xtype:"combobox",emptyText:"选择字段",name:"fieldName_userlist",displayField:"name",valueField:"value",width:140,store:s,queryMode:"local",listeners:{select:function(){Ext.apply(u.proxy.extraParams,{fieldName:Ext.getCmp("fieldName_userlist").getValue()})}},fieldStyle:"border-right: 0px!important;border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;"},{width:140,fieldLabel:"查询",emptyText:"输入字段值...",hideLabel:true,labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:u},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/accept.png",text:"确定选择",handler:function(){L()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"关闭窗口",handler:function(){if(selectAuthWin){selectAuthWin.close()}}}];function L(){var V=K.getSelectionModel().getSelection();if(V.length>0){var T=[],S=[];var X=[];for(var Z=0,aa=V.length;Z<aa;Z++){T.push(V[Z].get("id"));S.push(V[Z].get("displayName")+"("+V[Z].get("name")+")");X.push(V[Z].get("orgcode"))}var U=S.toString();var Y=T.toString();var W=X.toString();var R="U";var Q=javafree.CONTEXTPATH+"/security/resourceauth/doAddResAuth";Ext.Ajax.request({url:Q,method:"POST",scope:this,params:{resids:current_resids,fromType:R,authids:Y,authNames:U,orgCodes:W},success:function(ab){var ac=Ext.JSON.decode(ab.responseText);if(ac.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:ac.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){if(parentWinGridPanel_user){parentWinGridPanel_user.store.load({callback:function(ae,ad,ag){if(ag){var af=0;if(parentWinGridPanel_tab){parentWinGridPanel_tab.items.each(function(ah){++af;if(af==1){ah.setTitle("用户("+ae.length+")")}})}}}})}}})}else{Ext.MessageBox.show({title:"错误提示:",msg:ac.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}},failure:function(ab){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}}var I=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});function k(R,S,Q){R=Q.get("displayName");return R}var K=Ext.create("Ext.grid.Panel",{title:"",tbar:B,selModel:I,multiSelect:true,forceFit:true,store:u,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"用户名称",dataIndex:"display_name",renderer:k,locked:true,width:190},{header:"帐号",dataIndex:"name",width:150},{header:"机构编码",width:100,sortable:true,dataIndex:"orgcode"},{text:"次序号",width:70,sortable:true,align:"center",hidden:true,dataIndex:"sn"}],bbar:{xtype:"pagingtoolbar",store:u,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});var M=Ext.create("Ext.panel.Panel",{layout:{type:"border"},defaults:{split:true},items:[{region:"west",title:"",split:true,width:"30%",border:false,minWidth:100,maxSize:400,autoScroll:true,layout:"fit",items:J},{region:"center",width:"70%",border:false,minWidth:100,maxSize:500,split:true,autoScroll:true,layout:"fit",floatable:true,items:K}]});var G=javafree.CONTEXTPATH+"/identity/department/doGetDepartmentTreeJson";var p=Ext.create("Ext.data.TreeStore",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"type",type:"string"},{name:"sn",type:"int"}],proxy:{type:"ajax",url:G},folderSort:true});p.sort({property:"sn",direction:"ASC"},"prepend",false);var i=[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-expand.png",text:"",scope:this,handler:function(){a.getEl().mask("正在展开...");a.expandAll(function(){a.getEl().unmask()})}},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-collapse.png",text:"",handler:function(){a.collapseAll()}},"-",{width:220,fieldLabel:"查询",emptyText:"机构/部门名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:p},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/accept.png",text:"确定选择",handler:function(){N()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"关闭窗口",handler:function(){if(selectAuthWin){selectAuthWin.close()}}}];function N(){var V=a.getSelectionModel().getSelection();if(V.length>0){var T=[],S=[];var X=[];for(var Z=0,aa=V.length;Z<aa;Z++){T.push(V[Z].get("id"));S.push(V[Z].get("name"));X.push(V[Z].get("orgcode"))}var U=S.toString();var Y=T.toString();var W=X.toString();var R="D";var Q=javafree.CONTEXTPATH+"/security/resourceauth/doAddResAuth";Ext.Ajax.request({url:Q,method:"POST",scope:this,params:{resids:current_resids,fromType:R,authids:Y,authNames:U,orgCodes:W},success:function(ab){var ac=Ext.JSON.decode(ab.responseText);if(ac.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:ac.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){if(parentWinGridPanel_dept){parentWinGridPanel_dept.store.load({callback:function(ae,ad,ag){if(ag){var af=0;if(parentWinGridPanel_tab){parentWinGridPanel_tab.items.each(function(ah){++af;if(af==2){ah.setTitle("机构/部门("+ae.length+")")}})}}}})}}})}else{Ext.MessageBox.show({title:"错误提示:",msg:ac.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}},failure:function(ab){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}}var e=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});function H(R,S,Q){if(R=="ORG"){return"机构"}else{return"部门"}}var a=Ext.create("Ext.tree.Panel",{title:"",tbar:i,useArrows:false,rootVisible:false,store:p,selModel:e,multiSelect:true,forceFit:true,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{xtype:"treecolumn",text:"名称",width:340,sortable:true,dataIndex:"name",locked:true},{text:"类型",width:70,sortable:true,renderer:H,dataIndex:"type"},{header:"机构编码",width:140,sortable:true,dataIndex:"orgcode"},{text:"次序号",width:70,sortable:true,align:"center",dataIndex:"sn"}]});var y=javafree.CONTEXTPATH+"/identity/role/doGetRoleGridJson";var A=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"note",type:"string"},{name:"createDate",type:"string"},{name:"orgcode",type:"string"},{name:"scopetype",type:"string"},{name:"sn",type:"int"}],pageSize:x,proxy:{type:"jsonp",enablePaging:true,url:y,reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:true,remoteSort:true,groupField:"note",sorters:{property:"note",direction:"DESC"}});var O=[{width:220,fieldLabel:"查询",emptyText:"角色名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:A},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/accept.png",text:"确定选择",handler:function(){b()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"关闭窗口",handler:function(){if(selectAuthWin){selectAuthWin.close()}}}];function b(){var V=d.getSelectionModel().getSelection();if(V.length>0){var T=[],S=[];var X=[];for(var Z=0,aa=V.length;Z<aa;Z++){T.push(V[Z].get("id"));S.push(V[Z].get("name"));X.push(V[Z].get("orgcode"))}var U=S.toString();var Y=T.toString();var W=X.toString();var R="R";var Q=javafree.CONTEXTPATH+"/security/resourceauth/doAddResAuth";Ext.Ajax.request({url:Q,method:"POST",scope:this,params:{resids:current_resids,fromType:R,authids:Y,authNames:U,orgCodes:W},success:function(ab){var ac=Ext.JSON.decode(ab.responseText);if(ac.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:ac.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){if(parentWinGridPanel_role){parentWinGridPanel_role.store.load({callback:function(ae,ad,ag){if(ag){var af=0;if(parentWinGridPanel_tab){parentWinGridPanel_tab.items.each(function(ah){++af;if(af==3){ah.setTitle("角色("+ae.length+")")}})}}}})}}})}else{Ext.MessageBox.show({title:"错误提示:",msg:ac.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}},failure:function(ab){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}}var r=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});function z(R,S,Q){if(R=="PUBLIC"){return"公共"}else{return"私有"}}var d=Ext.create("Ext.grid.Panel",{title:"",tbar:O,selModel:r,multiSelect:true,forceFit:true,store:A,features:[{id:"group",ftype:"grouping",groupHeaderTpl:'<font style="font-weight:bold" color="#00008b">{name}</font><font color="red"> ({rows.length})</font>'}],columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"角色名称",dataIndex:"name",width:200},{header:"机构编码",width:120,sortable:true,dataIndex:"orgcode"},{header:"适用范围",width:100,sortable:true,align:"center",renderer:z,dataIndex:"scopetype"},{header:"次序号",dataIndex:"sn",sortable:true,align:"center",width:70}],bbar:{xtype:"pagingtoolbar",store:A,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});var l=javafree.CONTEXTPATH+"/identity/group/doGetGroupGridJson";var o=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"note",type:"string"},{name:"orgcode",type:"string"},{name:"createDate",type:"string"},{name:"scopetype",type:"string"},{name:"sn",type:"int"}],pageSize:x,proxy:{type:"jsonp",enablePaging:true,url:l,reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:true,remoteSort:true,groupField:"note",sorters:{property:"note",direction:"DESC"}});var q=[{width:220,fieldLabel:"查询",emptyText:"组名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:o},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/accept.png",text:"确定选择",handler:function(){F()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"关闭窗口",handler:function(){if(selectAuthWin){selectAuthWin.close()}}}];function F(){var V=n.getSelectionModel().getSelection();if(V.length>0){var T=[],S=[];var X=[];for(var Z=0,aa=V.length;Z<aa;Z++){T.push(V[Z].get("id"));S.push(V[Z].get("name"));X.push(V[Z].get("orgcode"))}var U=S.toString();var Y=T.toString();var W=X.toString();var R="G";var Q=javafree.CONTEXTPATH+"/security/resourceauth/doAddResAuth";Ext.Ajax.request({url:Q,method:"POST",scope:this,params:{resids:current_resids,fromType:R,authids:Y,authNames:U,orgCodes:W},success:function(ab){var ac=Ext.JSON.decode(ab.responseText);if(ac.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:ac.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){if(parentWinGridPanel_group){parentWinGridPanel_group.store.load({callback:function(ae,ad,ag){if(ag){var af=0;if(parentWinGridPanel_tab){parentWinGridPanel_tab.items.each(function(ah){++af;if(af==4){ah.setTitle("组("+ae.length+")")}})}}}})}}})}else{Ext.MessageBox.show({title:"错误提示:",msg:ac.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}},failure:function(ab){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}}var P=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});var n=Ext.create("Ext.grid.Panel",{title:"",tbar:q,selModel:P,multiSelect:true,forceFit:true,store:o,features:[{id:"group",ftype:"grouping",groupHeaderTpl:'<font style="font-weight:bold" color="#00008b">{name}</font><font color="red"> ({rows.length})</font>'}],columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"组名称",dataIndex:"name",width:200},{header:"机构编码",width:120,sortable:true,dataIndex:"orgcode"},{header:"适用范围",width:100,sortable:true,align:"center",renderer:z,dataIndex:"scopetype"},{header:"次序号",dataIndex:"sn",sortable:true,align:"center",width:70}],bbar:{xtype:"pagingtoolbar",store:o,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});var c=javafree.CONTEXTPATH+"/identity/orgcode/doGetOrgCodeGridJson";var w=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"code",type:"string"},{name:"sn",type:"int"}],pageSize:x,proxy:{type:"jsonp",enablePaging:true,url:c,reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:true,remoteSort:true,sorters:{property:"sn",direction:"ASC"}});var t=Ext.create("Ext.data.Store",{fields:["value","name"],data:[{value:"name",name:"名称"},{value:"code",name:"编码"}]});var f=[{fieldLabel:"查询",labelWidth:30,id:"fieldName_orgcode",xtype:"combobox",emptyText:"选择字段",name:"fieldName_orgcode",displayField:"name",valueField:"value",width:140,store:t,queryMode:"local",listeners:{select:function(){Ext.apply(w.proxy.extraParams,{fieldName:Ext.getCmp("fieldName_orgcode").getValue()})}},fieldStyle:"border-right: 0px!important;border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;"},{width:140,hideLabel:true,fieldLabel:"查询",emptyText:"输入查询内容...",xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:w},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/accept.png",text:"确定选择",handler:function(){E()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"关闭窗口",handler:function(){if(selectAuthWin){selectAuthWin.close()}}}];function E(){var S=g.getSelectionModel().getSelection();if(S.length>0){var W=[],X=[];for(var U=0,R=S.length;U<R;U++){X.push(S[U].get("code"));W.push(S[U].get("name"))}var V=W.toString();var Q=X.toString();var T=javafree.CONTEXTPATH+"/security/resourceorg/doAddResOrg";Ext.Ajax.request({url:T,method:"POST",scope:this,params:{resids:current_resids,orgCodes:Q,orgNames:V},success:function(Y){var Z=Ext.JSON.decode(Y.responseText);if(Z.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:Z.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){if(parentWinGridPanel_org){parentWinGridPanel_org.store.load({callback:function(ab,aa,ad){if(ad){var ac=0;if(parentWinGridPanel_tab){parentWinGridPanel_tab.items.each(function(ae){++ac;if(ac==5){ae.setTitle("机构编码("+ab.length+")")}})}}}})}}})}else{Ext.MessageBox.show({title:"错误提示:",msg:Z.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}},failure:function(Y){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}}var C=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});var g=Ext.create("Ext.grid.Panel",{title:"",tbar:f,selModel:C,multiSelect:true,forceFit:true,store:w,selType:"cellmodel",plugins:[Ext.create("Ext.grid.plugin.CellEditing",{clicksToEdit:3})],columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"名称",dataIndex:"name",width:180,},{header:"编码",width:180,sortable:true,dataIndex:"code"},{header:"次序号",dataIndex:"sn",sortable:true,align:"center",width:80,editor:{xtype:"numberfield",allowBlank:false,minValue:0,maxValue:100000}}],bbar:{xtype:"pagingtoolbar",store:w,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});var h=Ext.widget("tabpanel",{activeTab:0,tabPosition:"top",items:[{title:"选择用户",iconCls:"btn-icon-md  orange2 fa fa-user",layout:"fit",items:M},{title:"选择部门",iconCls:"btn-icon-md  orange2 fa fa-sitemap",layout:"fit",items:a},{title:"选择角色",iconCls:"btn-icon-md  orange2 fa fa-child",layout:"fit",items:d},{title:"选择组群",iconCls:"btn-icon-md  orange2 fa fa-users",layout:"fit",items:n},{title:"选择机构编码",iconCls:"btn-icon-md  orange2 fa fa-qrcode",layout:"fit",items:g}]});if(selectAuthWin){selectAuthWin.removeAll();selectAuthWin.add(h)}});</script>