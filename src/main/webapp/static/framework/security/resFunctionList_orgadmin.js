Ext.require(["Ext.data.*","Ext.grid.*","Ext.tree.*","Ext.form.ComboBox","Ext.util.*","Ext.grid.plugin.BufferedRenderer","Ext.toolbar.Paging","Ext.ux.ProgressBarPager","Ext.ux.form.SearchField","Ext.ux.CheckColumn","Ext.tab.*"]);var ICONPATH=javafree.CONTEXTPATH+"/assets/images/";Ext.onReady(function(){var x=50;
var a=javafree.CONTEXTPATH+"/security/resource/doGetMemuRecourceTreeJson";var F=Ext.create("Ext.data.TreeStore",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"note",type:"string"},{name:"description",type:"string"},{name:"url",type:"string"},{name:"type",type:"string"},{name:"childreCount",type:"int"},{name:"sn",type:"int"}],proxy:{type:"ajax",url:a},folderSort:false});
F.sort({property:"sn",direction:"ASC"},"prepend",false);var G=[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-expand.png",text:"",scope:this,handler:function(){p.getEl().mask("正在展开...");p.expandAll(function(){p.getEl().unmask();});}},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-collapse.png",text:"",handler:function(){p.collapseAll();
}},{width:180,fieldLabel:"查询",emptyText:"模块名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:F}];var f="";var p=Ext.create("Ext.tree.Panel",{title:"",tbar:G,useArrows:false,rootVisible:false,autoScroll:true,containerScroll:true,store:F,multiSelect:true,forceFit:true,columns:[{xtype:"treecolumn",text:"功能模块名称",width:280,sortable:true,dataIndex:"note"}],listeners:{"itemclick":function(J,I,M,K,N,L){f=I.data.id;
Ext.apply(u.proxy.extraParams,{"menuid":I.data.id});u.load();}}});var g=javafree.CONTEXTPATH+"/security/function/doGetRecourceTreeJson";var u=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"note",type:"string"},{name:"description",type:"string"},{name:"url",type:"string"},{name:"type",type:"string"},{name:"childreCount",type:"int"},{name:"sn",type:"int"}],pageSize:x,proxy:{type:"jsonp",enablePaging:true,url:g,reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:true,remoteSort:true,sorters:{property:"sn",direction:"ASC"}});
var o=[{width:150,fieldLabel:"查询",emptyText:"资源名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border: 1px solid #fff!important",store:u},{pressed:false,icon:ICONPATH+"button/group_key.png",cls:"x-btn-text-icon",text:"选择授权对象",handler:function(){C.doSelect_auth_fn();}}];var C={doSelect_auth_fn:function(){var K=s.getSelectionModel().getSelection();
if(K.length>0){var J=[];for(var M=0,I=K.length;M<I;M++){J.push(K[M].get("id"));}var L=javafree.CONTEXTPATH+"/security/function/doGetSelectAuthList?parentWinGridPanelID_user="+A.getId()+"&parentWinGridPanelID_role="+v.getId()+"&parentWinGridPanelID_dept="+q.getId()+"&parentWinGridPanelID_group="+D.getId()+"&parentWinGridPanelID_tab="+t.getId()+"&current_resids="+J.toString();
javafree.CenterPanel.popupWindow(L,"选择授权对象",800,580);}else{Ext.MessageBox.show({title:"错误提示:",msg:"请您先选中将要分配的安全资源!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}}};var E=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});function i(J,K,I){if("MENU"==I.get("type")){return"功能菜单";
}else{if("FUNCTION"==I.get("type")){return"类或类的方法";}else{if("BUTTON"==I.get("type")){return"页面元素";}else{return J;}}}}var s=Ext.create("Ext.grid.Panel",{title:"",tbar:o,selModel:E,multiSelect:true,forceFit:true,store:u,selType:"cellmodel",plugins:[Ext.create("Ext.grid.plugin.CellEditing",{clicksToEdit:7})],viewConfig:{enableTextSelection:true},columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"编码",dataIndex:"code",width:160,editor:{allowBlank:false}},{header:"名称",width:200,sortable:true,dataIndex:"note",editor:{allowBlank:false}},{header:"类型",width:100,sortable:true,dataIndex:"type",renderer:i,},{header:"说明",width:180,sortable:true,dataIndex:"description",hidden:true},{header:"次序号",dataIndex:"sn",sortable:true,align:"center",width:70,hidden:true}],listeners:{"itemclick":function(J,I,M,K,N,L){Ext.apply(m.proxy.extraParams,{"resourceid":I.data.id});
m.load({callback:function(P,O,R){if(R){var Q=0;t.items.each(function(S){++Q;if(Q==1){S.setTitle("用户("+P.length+")");}});}}});Ext.apply(c.proxy.extraParams,{"resourceid":I.data.id});c.load({callback:function(P,O,R){if(R){var Q=0;t.items.each(function(S){++Q;if(Q==2){S.setTitle("机构/部门("+P.length+")");}});
}}});Ext.apply(b.proxy.extraParams,{"resourceid":I.data.id});b.load({callback:function(P,O,R){if(R){var Q=0;t.items.each(function(S){++Q;if(Q==3){S.setTitle("角色("+P.length+")");}});}}});Ext.apply(z.proxy.extraParams,{"resourceid":I.data.id});z.load({callback:function(P,O,R){if(R){var Q=0;t.items.each(function(S){++Q;
if(Q==4){S.setTitle("组群("+P.length+")");}});}}});}},bbar:{xtype:"pagingtoolbar",store:u,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});var B=Ext.create("Ext.panel.Panel",{layout:{type:"border"},defaults:{split:true},items:[{region:"west",title:"",split:false,width:"28%",border:false,minWidth:100,maxSize:400,autoScroll:true,containerScroll:true,layout:"fit",items:p},{region:"center",width:"72%",style:{borderLeft:"1px solid #cecece"},border:false,minWidth:300,maxSize:800,split:false,autoScroll:true,layout:"fit",floatable:true,items:s}]});
var e={doDelResOrgcode:function(O,J){var K=O.getSelectionModel().getSelection();if(K.length>0){var K=O.getSelectionModel().getSelection();var N=[];for(var M=0,I=K.length;M<I;M++){N.push(K[M].get("id"));}var L=javafree.CONTEXTPATH+"/security/resourceorg/doDelResOrg?IDS="+N.toString();this.doPostRequest(L,O,J);
}else{Ext.MessageBox.show({title:"错误提示:",msg:"请您选中要删除的菜单项!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}},doDelResAuth:function(O,J){var K=O.getSelectionModel().getSelection();if(K.length>0){var K=O.getSelectionModel().getSelection();var N=[];for(var M=0,I=K.length;M<I;M++){N.push(K[M].get("id"));
}var L=javafree.CONTEXTPATH+"/security/resourceauth/doDelResAuth?IDS="+N.toString();this.doPostRequest(L,O,J);}else{Ext.MessageBox.show({title:"错误提示:",msg:"请您选中要删除的菜单项!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}},doPostRequest:function(J,K,I){Ext.Ajax.request({url:J,method:"POST",scope:this,success:function(L){var M=Ext.JSON.decode(L.responseText);
if(M.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:M.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){K.store.load({callback:function(O,N,Q){if(Q){var P=0;t.items.each(function(R){++P;if(P==I){if(P==1){R.setTitle("用户("+O.length+")");}if(P==2){R.setTitle("机构/部门("+O.length+")");
}if(P==3){R.setTitle("角色("+O.length+")");}if(P==4){R.setTitle("组群("+O.length+")");}}});}}});}});}else{Ext.MessageBox.show({title:"错误提示:",msg:M.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});}},failure:function(L){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});
}});}};var y=javafree.CONTEXTPATH+"/security/resourceauth/doGetResAuthGridJson";var m=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"fromType",type:"string"},{name:"authority_name",type:"string"},{name:"orgcode",type:"string"},{name:"creator",type:"string"},{name:"createDate",type:"string"}],pageSize:x,proxy:{type:"jsonp",enablePaging:true,url:y+"?fromType=U",reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:false,remoteSort:true,sorters:{property:"name",direction:"ASC"}});
var l=[{width:200,fieldLabel:"查询",emptyText:"用户名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:m},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"删除授权用户",handler:function(){e.doDelResAuth(A,1);
}}];var k=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});var A=Ext.create("Ext.grid.Panel",{title:"",tbar:l,selModel:k,multiSelect:true,forceFit:true,store:m,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"用户名称",dataIndex:"name",width:200},{header:"机构编码",width:180,sortable:true,dataIndex:"orgcode"},{header:"操作人",width:80,sortable:true,dataIndex:"creator"}],bbar:{xtype:"pagingtoolbar",store:m,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});
var c=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"fromType",type:"string"},{name:"authority_name",type:"string"},{name:"orgcode",type:"string"},{name:"creator",type:"string"},{name:"createDate",type:"string"}],pageSize:x,proxy:{type:"jsonp",enablePaging:true,url:y+"?fromType=D",reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:false,remoteSort:true,sorters:{property:"name",direction:"ASC"}});
var d=[{width:200,fieldLabel:"查询",emptyText:"机构名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:c},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"删除授权部门",handler:function(){e.doDelResAuth(q,2);
}}];var H=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});var q=Ext.create("Ext.grid.Panel",{title:"",tbar:d,selModel:H,multiSelect:true,forceFit:true,store:c,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"机构名称",dataIndex:"name",width:200},{header:"机构编码",width:180,sortable:true,dataIndex:"orgcode"},{header:"操作人",width:80,sortable:true,dataIndex:"creator"}],bbar:{xtype:"pagingtoolbar",store:c,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});
var b=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"fromType",type:"string"},{name:"authority_name",type:"string"},{name:"orgcode",type:"string"},{name:"creator",type:"string"},{name:"createDate",type:"string"}],pageSize:x,proxy:{type:"jsonp",enablePaging:true,url:y+"?fromType=R",reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:false,remoteSort:true,sorters:{property:"name",direction:"ASC"}});
var n=[{width:200,fieldLabel:"查询",emptyText:"角色名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:b},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"删除授权角色",handler:function(){e.doDelResAuth(v,3);
}}];var h=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});var v=Ext.create("Ext.grid.Panel",{title:"",tbar:n,selModel:h,multiSelect:true,forceFit:true,store:b,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"角色名称",dataIndex:"name",width:200},{header:"机构编码",width:180,sortable:true,dataIndex:"orgcode"},{header:"操作人",width:80,sortable:true,dataIndex:"creator"}],bbar:{xtype:"pagingtoolbar",store:b,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});
var z=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"fromType",type:"string"},{name:"authority_name",type:"string"},{name:"orgcode",type:"string"},{name:"creator",type:"string"},{name:"createDate",type:"string"}],pageSize:x,proxy:{type:"jsonp",enablePaging:true,url:y+"?fromType=G",reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:false,remoteSort:true,sorters:{property:"name",direction:"ASC"}});
var w=[{width:200,fieldLabel:"查询",emptyText:"组群名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:z},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"删除授权群组",handler:function(){e.doDelResAuth(D,4);
}}];var j=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});var D=Ext.create("Ext.grid.Panel",{title:"",tbar:w,selModel:j,multiSelect:true,forceFit:true,store:z,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"组群名称",dataIndex:"name",width:200},{header:"机构编码",width:180,sortable:true,dataIndex:"orgcode"},{header:"操作人",width:80,sortable:true,dataIndex:"creator"}],bbar:{xtype:"pagingtoolbar",store:z,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});
var t=Ext.widget("tabpanel",{activeTab:0,tabPosition:"top",items:[{title:"用户",iconCls:"btn-icon-md  orange2 fa fa-user",layout:"fit",items:A},{title:"机构/部门",iconCls:"btn-icon-md orange2 fa fa-sitemap",layout:"fit",items:q},{title:"角色",iconCls:"btn-icon-md orange2 fa fa-child",layout:"fit",items:v},{title:"组群",iconCls:"btn-icon-md orange2 fa fa-users",layout:"fit",items:D}]});
var r=Ext.create("Ext.panel.Panel",{layout:{type:"border"},style:{borderBottom:"1px solid #cecece"},defaults:{split:true},items:[{region:"west",split:true,width:"60%",border:false,minWidth:400,maxSize:900,autoScroll:true,layout:"fit",items:B},{region:"center",width:"40%",border:false,minWidth:250,maxSize:700,split:true,autoScroll:true,layout:"fit",floatable:true,items:t}]});
javafree.CenterPanel.addCmp(r);});