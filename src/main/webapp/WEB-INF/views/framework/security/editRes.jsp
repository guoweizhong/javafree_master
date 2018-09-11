<%@ page contentType="text/html; charset=UTF-8"%><%@ include file="/WEB-INF/views/framework/common/taglibs.jsp"%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>编辑资源信息</title></head><body><script type="text/javascript">var requireCSS=["${ctx}/assets/plugins/jquery-validate/jquery.validate.css"];loadCSS(requireCSS);var requireJS=["${ctx}/assets/plugins/jquery-validate/jquery.validate.min.js","${ctx}/assets/plugins/jquery-validate/lib/jquery.metadata.min.js","${ctx}/assets/plugins/jquery-validate/lib/jquery.form.min.js","${ctx}/assets/plugins/jquery-validate/localization/messages_cn.js"];loadJS(requireJS,function(){formValidateInit()});function formValidateInit(){jQuery.metadata.setType("attr","validate");jQuery("#sr_form").validate()}Ext.onReady(function(){function f(){if(jQuery("#sr_form").valid()){var g=function(i){var h=Ext.JSON.decode(i);if(h.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:h.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO,fn:function(){d()}})}else{Ext.MessageBox.show({title:"错误提示:",msg:h.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}};jQuery("#sr_form").ajaxSubmit(g)}}function e(){if(jQuery("#sr_form").valid()){var g=function(i){var h=Ext.JSON.decode(i);if(h.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:h.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO})}else{Ext.MessageBox.show({title:"错误提示:",msg:h.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}Ext.getDom("code").value="";Ext.getDom("note").value="";Ext.getDom("id").value="";$("#sn").val(parseInt($("#sn").val()==""?0:$("#sn").val())+1)};jQuery("#sr_form").ajaxSubmit(g)}}function d(){var h=Ext.getCmp("${param.popupwinid}");if(h){h.close()}else{centerPanel.closeTab(centerPanel.currentTab)}var g=Ext.getCmp("${param.parentWinGridPanelID}");if(g){g.store.load()}}var a=[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/save_add.png",text:"保存并新增",handler:function(){e()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/saved.png",text:"保存",handler:function(){f()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/dialog-close.png",text:"关闭",handler:function(){d()}}];var b=Ext.create("Ext.panel.Panel",{layout:"fit",items:[{title:"",border:false,bodyCls:"form_panel_body",autoScroll:true,contentEl:"sr_form-main-content",tbar:a,anchor:"98% 98%"}]});var c=Ext.getCmp("${param.popupwinid}");if(c){c.removeAll();c.add(b)}});</script><div id="sr_form-main-content" class="main_from"><form:form id="sr_form" modelAttribute="sr" action="${pageContext.request.contextPath}/security/function/doEditFunction" method="post" enctype="multipart/form-data"><form:hidden path="id"/><form:hidden path="parent_id"/><div class="form_table_box" style=" margin:0 auto; width:98%;"><div class="form_table"><h2 class="form_title_head"><div class="tip"><span class="star">标注的为必填项</span></div> 编辑安全资源信息 </h2><table width="100%" border="0" cellspacing="0" cellpadding="0" class="form_table_blk_border"><tr><td class="form-TdLabel"><span class="star">所属模块:</span></td><td nowrap="nowrap" class="form-TdField "><div id="parent_combobox_id" class="Td-NoPadding"></div></td></tr><tr><td class="form-TdLabel" width="15%"><span class="star">编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码: </span></td><td nowrap="nowrap" class="form-TdField"><form:input path="code" validate="{required:true,remote:{url:'${pageContext.request.contextPath}/security/function/doValidateCode',type:'post',data:{id:function(){return jQuery('#id').val();}}},messages:{remote:'该编码已经存在,请输入其它值!'}}" cssStyle="width:75%"/></td></tr><tr><td class="form-TdLabel" width="15%"><span class="star">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称: </span></td><td nowrap="nowrap" class="form-TdField"><form:input path="note" validate="{required:true}" cssStyle="width:75%"/></td></tr><tr><td class="form-TdLabel" width="15%"><span class="star">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型: </span></td><td nowrap="nowrap" class="form-TdField Td-NoPadding"><div id="typeDisplay" class="Td-NoPadding"></div></td></tr><tr><td class="form-TdLabel" width="15%">注&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;释: </td><td nowrap="nowrap" class="form-TdField"><form:input path="description" cssStyle="width:75%"/></td></tr><tr><td class="form-TdLabel">序&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</td><td class="form-TdField"><form:input path="sn" validate="{digits:true}" cssStyle="width:75%"/></td></tr><tbody></table></div></div></form:form></div><script type="text/javascript">Ext.require(["Ext.form.field.ComboBox","Ext.window.MessageBox","Ext.form.FieldSet","Ext.tip.QuickTipManager","Ext.ux.TreePicker","Ext.data.*"]);Ext.onReady(function(){Ext.create("Ext.ux.TreePicker",{renderTo:"parent_combobox_id",fieldLabel:"",width:522,labelWidth:10,margin:"0 0 0 0",displayField:"note",rootVisible:false,fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",value:"${sr.parent_id}",minPickerHeight:400,onLoad:function(){this.setValue("${sr.parent_id}");this.setRawValue("${parentName}")},onItemClick:function(c,b,d,g,f){this.selectItem(b);Ext.getDom("parent_id").value=b.get("id")},store:Ext.create("Ext.data.TreeStore",{fields:["id","note"],root:{note:"请选择模块",expanded:true},proxy:{type:"ajax",url:javafree.CONTEXTPATH+"/security/resource/doGetMemuRecourceTreeJson",reader:{type:"json"}},folderSort:true,sorters:[{property:"sn",direction:"ASC"}]})});var a=Ext.create("Ext.data.Store",{fields:["code","name"],data:[{code:"FUNCTION",name:"类或类的方法"},{code:"BUTTON",name:"页面元素"}]});Ext.create("Ext.form.field.ComboBox",{fieldLabel:"",renderTo:"typeDisplay",displayField:"name",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",valueField:"code",hiddenName:"type",value:"${sr.type}",width:522,store:a,queryMode:"local",typeAhead:true,editable:false})});</script></body></html>