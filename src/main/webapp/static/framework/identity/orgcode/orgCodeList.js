Ext.require(["Ext.data.*","Ext.grid.*","Ext.tree.*","Ext.form.ComboBox","Ext.util.*","Ext.grid.plugin.BufferedRenderer","Ext.toolbar.Paging","Ext.ux.ProgressBarPager","Ext.ux.form.SearchField","Ext.ux.CheckColumn","Ext.tab.*"]);var ICONPATH=javafree.CONTEXTPATH+"/assets/images/";Ext.onReady(function(){var z=50;
var u=javafree.CONTEXTPATH+"/identity/orgcodeAdmin/doGetOrgcodeAdminGridJson";var D=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"orgcode",type:"string"},{name:"user_name",type:"string"},{name:"user_displayname",type:"string"}],pageSize:z,proxy:{type:"jsonp",enablePaging:true,url:u,reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:false,remoteSort:true,remoteGroup:false,sorters:{property:"user_name",direction:"ASC"}});
var q=javafree.CONTEXTPATH+"/identity/orgcode/doGetOrgCodeGridJson";var f=Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"code",type:"string"},{name:"sn",type:"int"}],pageSize:z,proxy:{type:"jsonp",enablePaging:true,url:q,reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:true,remoteSort:true,sorters:{property:"sn",direction:"ASC"}});
var m=Ext.create("Ext.data.Store",{fields:["value","name"],data:[{"value":"name","name":"名称"},{"value":"code","name":"编码"}]});var B=[{fieldLabel:"查询",labelWidth:30,id:"fieldName_orgcode",xtype:"combobox",emptyText:"选择字段",name:"fieldName_orgcode",displayField:"name",valueField:"value",width:140,store:m,queryMode:"local",listeners:{"select":function(){Ext.apply(f.proxy.extraParams,{"fieldName":Ext.getCmp("fieldName_orgcode").getValue()});
}},fieldStyle:"border-right: 0px!important;border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;"},{width:140,hideLabel:true,fieldLabel:"查询",emptyText:"输入查询内容...",xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:f},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/add.png",text:"新增",handler:function(){E();
}},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/edit.png",text:"编辑",handler:function(){c();}},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"删除",handler:function(){b();}},{pressed:false,icon:ICONPATH+"button/group_key.png",cls:"x-btn-text-icon",text:"设置机构管理员",handler:function(){o.doSelect_auth_fn();
}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/arrow-up.png",text:"上移",handler:function(){a();}},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/arrow-down.png",text:"下移",handler:function(){d();}},"-",{pressed:false,xtype:"splitbutton",cls:"x-btn-text-icon",icon:ICONPATH+"button/menu-show.png",text:"更多操作",menu:[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/reset-sort-order.png",text:"重排序号",handler:function(){h();
}},{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/edit-list-order.png",text:"设置序号",handler:function(){w();}}]}];var o={doSelect_auth_fn:function(){var H=i.getSelectionModel().getSelection();if(H.length>0){var G=[];for(var J=0,F=H.length;J<F;J++){G.push(H[J].get("code"));}var I=javafree.CONTEXTPATH+"/identity/orgcodeAdmin/doGetSelectAdminList?parentWinGridPanelID="+g.getId()+"&current_orgcodeids="+G.toString();
javafree.CenterPanel.popupWindow(I,"选择机构管理员",880,580);}else{Ext.MessageBox.show({title:"错误提示:",msg:"请您先选中将要分配的机构编码!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}}};function E(){var F=javafree.CONTEXTPATH+"/identity/orgcode/doGetOrgCode?parentWinGridPanelID="+i.getId();javafree.CenterPanel.popupWindow(F,"新增机构编码信息");
}function c(){var F=i.getSelectionModel().getSelection();if(F.length>0){if(F.length>1){Ext.MessageBox.show({title:"提示",msg:"每次只能编辑一条记录！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}else{var G=javafree.CONTEXTPATH+"/identity/orgcode/doGetOrgCode?id="+F[0].get("id")+"&parentWinGridPanelID="+i.getId();
javafree.CenterPanel.popupWindow(G,"编辑机构编码信息");}}else{Ext.MessageBox.show({title:"提示",msg:"请选择要编辑的记录！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}}function b(){var F=i.getSelectionModel().getSelection();if(F.length>0){Ext.MessageBox.confirm("提示信息:","您确定要删除选中的数据吗?",k);}else{Ext.MessageBox.show({title:"错误提示:",msg:"请您选中要删除的行!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});
}}function k(K){if(K=="yes"){var G=i.getSelectionModel().getSelection();var J=[];for(var I=0,F=G.length;I<F;I++){J.push(G[I].get("id"));}var H=javafree.CONTEXTPATH+"/identity/orgcode/doDelOrgCode";Ext.Ajax.request({url:H,method:"GET",scope:this,params:{"IDS":J.toString()},success:function(L){var M=Ext.JSON.decode(L.responseText);
if(M.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:M.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){f.reload();}});}else{Ext.MessageBox.show({title:"错误提示:",msg:M.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});}},failure:function(L){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});
}});}}function l(F,G){Ext.Ajax.request({url:F,method:"GET",scope:this,success:function(H){var I=Ext.JSON.decode(H.responseText);if(I.success==true){if(G){Ext.MessageBox.alert({title:"提示信息:",msg:I.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){return true;}});}else{return true;}}else{Ext.MessageBox.show({title:"错误提示:",msg:I.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});
}},failure:function(H){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}});}function s(K){var G=i;var N=G.getStore();var M=javafree.CONTEXTPATH+"/identity/orgcode/doSetDrag";var U=G.getSelectionModel().getSelection();if(U.length>0){if(U.length>1){Ext.MessageBox.show({title:"提示：",msg:"每次只能移动一行数据！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});
}else{var F=U[0].get("id");var I=N.getById(F);var O=N.indexOf(I);if(("above"==K)&&(O>0)){var R=O-1;var P=N.getAt(R);var T=P.get("id");var W=P.get("sn");var H=I.get("sn");H=H<2?2:H;W=W<1?1:W;if(W==H){H=W+1;}I.set("sn",W);P.set("sn",H);N.removeAt(O);N.insert(O-1,I);G.getSelectionModel().select(I);var J=M+"?type=above&dropNodeId="+F+"&targetId="+T;
l(J,false);}if(("below"==K)&&(O<N.getCount()-1)){var Q=O+1;var S=N.getAt(Q);var L=S.get("id");var H=I.get("sn");var V=S.get("sn");H=H<1?1:H;V=V<2?2:V;if(H==V){V=H+1;}I.set("sn",V);S.set("sn",H);N.removeAt(O);N.insert(O+1,I);G.getSelectionModel().select(I);var J=M+"?type=below&dropNodeId="+F+"&targetId="+L;
l(J,false);}}}else{Ext.MessageBox.show({title:"提示",msg:"请选择要移动的记录！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}}function a(){s("above");}function d(){s("below");}function w(){var G=i.getSelectionModel().getSelection();if(G.length>0){if(G.length>1){Ext.MessageBox.show({title:"提示",msg:"每次只能编辑一条记录！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});
}else{var F=G[0];Ext.MessageBox.show({title:"设置用户序号...",msg:'用户：" '+F.get("name")+' "当前序号为："'+F.get("sn")+'" <br />   请输入新的序号...',buttonText:{ok:"确定",cancel:"取消"},prompt:true,value:F.get("sn"),fn:v,icon:Ext.MessageBox.INFO});}}else{Ext.MessageBox.show({title:"提示",msg:"请选择要编辑的记录！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});
}}function h(){Ext.MessageBox.show({title:"设置当前列表顺序号！",msg:'重排当前列表顺序号，<br />请指定序号起始值，默认为"1"',buttonText:{yes:"确定",cancel:"取消"},prompt:true,fn:v,value:1,icon:Ext.MessageBox.QUESTION});}function v(H,L){if(H=="yes"||H=="ok"){if(!(L.length>0&&(Math.round(L)==L))){Ext.MessageBox.show({title:"错误提示:",msg:'序号"'+L+'"格式错识，请输入整型数字！',buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});
return;}var G=javafree.CONTEXTPATH+"/identity/orgcode/doSetOrder?order="+Math.round(L);if(H=="yes"){var K=G+"&type=root";t(K);}else{var F=i.getSelectionModel().getSelection();if(F.length>0){if(F.length>1){Ext.MessageBox.show({title:"提示",msg:"每次只能选择一条记录！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});
}else{var I=F[0];var J=I.get("id");if(H=="ok"){var K=G+"&type=setorder&nodeId="+J;t(K);}}}else{Ext.MessageBox.show({title:"提示",msg:"请选择要编辑的记录！",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}}}}function t(F){Ext.Ajax.request({url:F,method:"GET",scope:this,success:function(G){var H=Ext.JSON.decode(G.responseText);
if(H.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:H.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){f.load({params:{start:0,limit:z}});}});}else{Ext.MessageBox.show({title:"错误提示:",msg:H.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});}},failure:function(G){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});
}});}var C=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});var i=Ext.create("Ext.grid.Panel",{title:"",tbar:B,selModel:C,multiSelect:true,forceFit:true,store:f,selType:"cellmodel",plugins:[Ext.create("Ext.grid.plugin.CellEditing",{clicksToEdit:3})],columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"名称",dataIndex:"name",width:180,},{header:"编码",width:180,sortable:true,dataIndex:"code"},{header:"次序号",dataIndex:"sn",sortable:true,align:"center",width:80,editor:{xtype:"numberfield",allowBlank:false,minValue:0,maxValue:100000}}],listeners:{"itemclick":function(G,F,J,H,K,I){Ext.apply(D.proxy.extraParams,{"orgcode":F.data.code});
D.load({params:{start:0,limit:z}});g.setTitle(F.data.name+"-被分配管理员列表：");}},bbar:{xtype:"pagingtoolbar",store:f,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});i.on("edit",j,this);function j(){var F="",I="";var G=i.getSelectionModel().getSelection();if(G.length>0){F=G[0].get("id");I=G[0].get("sn");
var H=javafree.CONTEXTPATH+"/identity/orgcode/doEditOrgCodeSn";Ext.Ajax.request({url:H,method:"POST",scope:this,params:{"ID":F,"SN":I,},success:function(J){var K=Ext.JSON.decode(J.responseText);if(K.success==true){}else{Ext.MessageBox.show({title:"错误提示:",msg:K.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});
}},failure:function(J){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}});}}var x=Ext.create("Ext.data.Store",{fields:["value","name"],data:[{"value":"user_name","name":"登录帐号"},{"value":"user_displayname","name":"中文名"}]});var y=[{fieldLabel:"查询",labelWidth:30,id:"fieldName_orgcodeadmin",xtype:"combobox",emptyText:"选择字段",name:"fieldName_orgcodeadmin",displayField:"name",valueField:"value",width:140,store:x,queryMode:"local",listeners:{"select":function(){Ext.apply(D.proxy.extraParams,{"fieldName":Ext.getCmp("fieldName_orgcodeadmin").getValue()});
}},fieldStyle:"border-right: 0px!important;border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;"},{width:200,hideLabel:true,fieldLabel:"查询",emptyText:"输入查询内容...",xtype:"searchfield",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",store:D},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/delete.png",text:"删除成员",handler:function(){A();
}}];function A(){var F=i.getSelectionModel().getSelection();if(F.length>0){Ext.MessageBox.confirm("提示信息:","您确定要删除选中的数据吗?",e);}else{Ext.MessageBox.show({title:"错误提示:",msg:"请您选中要删除的行!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}}function e(K){if(K=="yes"){var G=g.getSelectionModel().getSelection();
var J=[];for(var I=0,F=G.length;I<F;I++){J.push(G[I].get("id"));}var H=javafree.CONTEXTPATH+"/identity/orgcodeAdmin/doDelOrgcodeAdmin";Ext.Ajax.request({url:H,method:"POST",scope:this,params:{"IDS":J.toString()},success:function(L){var M=Ext.JSON.decode(L.responseText);if(M.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:M.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){D.reload();
}});}else{Ext.MessageBox.show({title:"错误提示:",msg:M.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});}},failure:function(L){Ext.MessageBox.show({title:"系统提示信息:",msg:"与服务器端通讯失败,请与管理员联系!",buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});}});}}var r=Ext.create("Ext.selection.CheckboxModel",{columns:[{xtype:"checkcolumn",dataIndex:"id"}]});
var n="已分配管理员列表：";var g=Ext.create("Ext.grid.Panel",{title:n,tbar:y,selModel:r,multiSelect:true,forceFit:true,store:D,viewConfig:{enableTextSelection:true},columns:[new Ext.grid.RowNumberer({header:"NO.",width:35}),{header:"登录帐号",dataIndex:"user_name",width:110},{header:"中文名",dataIndex:"user_displayname",width:110},{header:"机构编码",dataIndex:"orgcode",width:110,hidden:true}],bbar:{xtype:"pagingtoolbar",store:D,displayInfo:true,plugins:new Ext.ux.ProgressBarPager()}});
var p=Ext.create("Ext.panel.Panel",{layout:{type:"border"},style:{borderBottom:"1px solid #cecece"},items:[{region:"west",title:"",split:true,width:"65%",border:false,minWidth:400,maxSize:800,autoScroll:true,layout:"fit",items:i},{region:"center",width:"35%",border:false,minWidth:300,maxSize:700,split:true,autoScroll:true,layout:"fit",floatable:true,items:g}]});
javafree.CenterPanel.addCmp(p);});