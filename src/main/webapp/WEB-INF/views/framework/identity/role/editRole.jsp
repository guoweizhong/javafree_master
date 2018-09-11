<%@ page contentType="text/html; charset=UTF-8"%><%@ include file="/WEB-INF/views/framework/common/taglibs.jsp"%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>编辑机构信息</title></head><body><script type="text/javascript">var requireCSS=["${ctx}/assets/plugins/jquery-validate/jquery.validate.css"];loadCSS(requireCSS);var requireJS=["${ctx}/assets/plugins/jquery-validate/jquery.validate.min.js","${ctx}/assets/plugins/jquery-validate/lib/jquery.metadata.min.js","${ctx}/assets/plugins/jquery-validate/lib/jquery.form.min.js","${ctx}/assets/plugins/jquery-validate/localization/messages_cn.js"];loadJS(requireJS,function(){formValidateInit()});function formValidateInit(){jQuery.metadata.setType("attr","validate");jQuery("#role_form").validate()};</script><script type="text/javascript">Ext.onReady(function(){function f(){if(jQuery("#role_form").valid()){var g=function(i){var h=Ext.JSON.decode(i);if(h.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:h.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){d()}})}else{Ext.MessageBox.show({title:"错误提示:",msg:h.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}};jQuery("#role_form").ajaxSubmit(g)}}function e(){if(jQuery("#role_form").valid()){var g=function(i){var h=Ext.JSON.decode(i);if(h.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:h.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO})}else{Ext.MessageBox.show({title:"错误提示:",msg:h.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}Ext.getDom("name").value="";Ext.getDom("note").value="";Ext.getDom("id").value="";$("#sn").val(parseInt($("#sn").val()==""?0:$("#sn").val())+1)};jQuery("#role_form").ajaxSubmit(g)}}function d(){var h=Ext.getCmp("${param.popupwinid}");if(h){h.close()}else{centerPanel.closeTab(centerPanel.currentTab)}var g=Ext.getCmp("${param.parentWinGridPanelID}");if(g){g.store.load()}}var a=[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/save_add.png",text:"保存并新增",handler:function(){e()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/saved.png",text:"保存",handler:function(){f()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/dialog-close.png",text:"关闭",handler:function(){d()}}];var b=Ext.create("Ext.panel.Panel",{layout:"fit",items:[{title:"",bsn:false,bodyCls:"form_panel_body",autoScroll:true,contentEl:"role_form-main-content",tbar:a,anchor:"98% 98%"}]});var c=Ext.getCmp("${param.popupwinid}");if(c){c.removeAll();c.add(b)}});</script><div id="role_form-main-content" class="main_from"><form:form id="role_form" modelAttribute="role" action="${pageContext.request.contextPath}/identity/role/doEditRole" method="post" enctype="multipart/form-data"><form:hidden path="id"/><input id="orgcode_id" type="hidden" name="orgcode_id" value="${role.orgcode}"/><div class="form_table_box" style=" margin:0 auto; width:98%;"><div class="form_table"><h2 class="form_title_head"><div class="tip"><span class="star">标注的为必填项</span></div> 编辑角色信息 </h2><table width="100%" bsn="0" cellspacing="0" cellpadding="0" class="form_table_blk_border"><tr><td class="form-TdLabel" width="15%"><span class="star">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称: </span></td><td nowrap="nowrap" class="form-TdField"><form:input placeholder="输入角色名称" path="name" validate="{required:true,remote:{url:'${pageContext.request.contextPath}/identity/role/doValidateName',type:'post',data:{id:function(){return jQuery('#id').val();},orgcode:function(){return jQuery('#orgcode_id').val();}}},messages:{remote:'该角色已经存在,请输入其它值!'}}" cssStyle="width:70%"/></td></tr><tr><td class="form-TdLabel" width="15%">分组归类: </td><td nowrap="nowrap" class="form-TdField Td-NoPadding"><div id="note_div" class="Td-NoPadding"></div></td></tr><script type="text/javascript">Ext.require(["Ext.form.field.ComboBox","Ext.window.MessageBox","Ext.form.FieldSet","Ext.tip.QuickTipManager","Ext.ux.TreePicker","Ext.data.*"]);Ext.onReady(function(){Ext.create("Ext.form.field.ComboBox",{fieldLabel:"",renderTo:"note_div",displayField:"name",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",valueField:"name",editable:true,hiddenName:"note",emptyText:"选择或手动输入...",triggerAction:"all",queryMode:"local",typeAhead:true,value:"${role.note}",onLoad:function(){this.setRawValue("${role.note}")},listeners:{blur:function(a){this.setValue(this.getRawValue());this.setRawValue(this.getRawValue())}},width:350,store:Ext.create("Ext.data.Store",{fields:[{name:"name",type:"string"}],pageSize:500,proxy:{type:"ajax",enablePaging:true,url:javafree.CONTEXTPATH+"/identity/role/doGetRoleAllGroupJson",reader:{type:"json",rootProperty:"rows"}},autoLoad:true,remoteSort:false})})});</script><jf:box name="scopetype_box"><tr><td class="form-TdLabel" width="15%"><span class="star">适用范围: </span></td><td nowrap="nowrap" class="form-TdField Td-NoPadding"><div id="scoptypeDiv" class="Td-NoPadding"></div></td></tr><script type="text/javascript">Ext.require(["Ext.form.field.ComboBox","Ext.window.MessageBox","Ext.form.FieldSet","Ext.tip.QuickTipManager","Ext.ux.TreePicker","Ext.data.*"]);Ext.onReady(function(){var a=Ext.create("Ext.data.Store",{fields:["code","name"],data:[{code:"PUBLIC",name:"公共"},{code:"PRIVATE",name:"私有"}]});Ext.create("Ext.form.field.ComboBox",{fieldLabel:"",renderTo:"scoptypeDiv",displayField:"name",editable:true,valueField:"code",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",hiddenName:"scopetype",value:"${role.scopetype}",width:180,store:a,queryMode:"local",typeAhead:true})});</script></jf:box><jf:box name="orgcode_box"><tr><td class="form-TdLabel" width="15%"><span class="star">机构编码: </span></td><td nowrap="nowrap" class="form-TdField Td-NoPadding"><div id="orgcodeDisplay" class="Td-NoPadding"></div></td></tr><script type="text/javascript">Ext.require(["Ext.form.field.ComboBox","Ext.window.MessageBox","Ext.form.FieldSet","Ext.tip.QuickTipManager","Ext.ux.TreePicker","Ext.data.*"]);Ext.onReady(function(){Ext.create("Ext.form.field.ComboBox",{fieldLabel:"",renderTo:"orgcodeDisplay",displayField:"name",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",valueField:"code",hiddenName:"orgcode",triggerAction:"all",queryMode:"local",forceSelection:true,typeAhead:true,value:"${role.orgcode}",onLoad:function(){this.setRawValue("${orgcodeName}")},width:350,store:Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"code",type:"string"},{name:"sn",type:"int"}],pageSize:500,proxy:{type:"jsonp",enablePaging:true,url:javafree.CONTEXTPATH+"/identity/orgcode/doGetOrgCodeGridJson",reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:true,remoteSort:false,sorters:{property:"sn",direction:"ASC"}})})});</script></jf:box><tr><td class="form-TdLabel">序&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</td><td class="form-TdField"><form:input path="sn" validate="{digits:true}" cssStyle="width:70%"/></td></tr><tbody></table></div></div></form:form></div><script type="application/javascript">$(document).ready(function(){$("[data-rel=popover]").popover();$("[data-rel=tooltip]").tooltip({container:"body"})});</script></body></html>