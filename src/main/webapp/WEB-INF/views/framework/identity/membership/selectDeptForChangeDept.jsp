<%@ page contentType="text/html; charset=UTF-8"%><script type="text/javascript">var current_memberids="${param.current_memberids}";var selectDeptParentWinGridPanel=Ext.getCmp("${param.parentWinGridPanelID}");var selectDeptWin=Ext.getCmp("${param.popupwinid}");Ext.require(["Ext.data.*","Ext.grid.*","Ext.tree.*","Ext.form.ComboBox","Ext.util.*","Ext.grid.plugin.BufferedRenderer","Ext.toolbar.Paging","Ext.ux.ProgressBarPager","Ext.ux.form.SearchField","Ext.ux.CheckColumn"]);var ICONPATH=javafree.CONTEXTPATH+"/assets/images/";Ext.onReady(function(){var e=50;var h=javafree.CONTEXTPATH+"/identity/department/doGetDepartmentTreeJson";var c=Ext.create("Ext.data.TreeStore",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"type",type:"string"},{name:"sn",type:"int"}],proxy:{type:"ajax",url:h},folderSort:true});c.sort({property:"sn",direction:"ASC"},"prepend",false);var g=[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-expand.png",text:"",scope:this,handler:function(){d.getEl().mask("正在展开...");d.expandAll(function(){d.getEl().unmask()})}},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/ns-collapse.png",text:"",handler:function(){d.collapseAll()}},"-",{width:220,fieldLabel:"查询",emptyText:"机构/部门名称...",labelWidth:30,xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:c},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/accept.png",text:"确定选择",handler:function(){b()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"关闭窗口",handler:function(){if(selectDeptWin){selectDeptWin.close()}}}];function b(){var n=d.getSelectionModel().getSelection();if(n.length>0){if(n.length>1){Ext.MessageBox.show({title:"提示",msg:"每次只能选择一条记录！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}else{var m=[],k=[];for(var p=0,r=n.length;p<r;p++){m.push(n[p].get("id"));k.push(n[p].get("name"))}var o=k.toString();var q=m.toString();var l="D";var j=javafree.CONTEXTPATH+"/identity/membership/doEditMembershipForDeptRole";Ext.Ajax.request({url:j,method:"POST",scope:this,params:{current_memberids:current_memberids,fromType:l,selectedids:q,selectedNames:o},success:function(i){var s=Ext.JSON.decode(i.responseText);if(s.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:s.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){if(selectDeptParentWinGridPanel){selectDeptParentWinGridPanel.store.load()}}})}else{Ext.MessageBox.show({title:"错误提示:",msg:s.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}},failure:function(i){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING})}})}}}var f=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});function a(j,k,i){if(j=="ORG"){return"机构"}else{return"部门"}}var d=Ext.create("Ext.tree.Panel",{title:"",tbar:g,useArrows:false,rootVisible:false,store:c,selModel:f,multiSelect:true,forceFit:true,columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{xtype:"treecolumn",text:"名称",width:280,sortable:true,dataIndex:"name",locked:true},{text:"类型",width:90,sortable:true,renderer:a,dataIndex:"type"},{text:"次序号",width:80,sortable:true,align:"center",dataIndex:"sn"}]});if(selectDeptWin){selectDeptWin.removeAll();selectDeptWin.add(d)}});</script>