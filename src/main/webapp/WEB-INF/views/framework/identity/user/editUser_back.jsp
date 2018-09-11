<%@ page contentType="text/html; charset=UTF-8"%><%@ include file="/WEB-INF/views/framework/common/taglibs.jsp"%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><title>编辑用户信息</title></head><body><script type="text/javascript">var requireCSS=["${ctx}/assets/plugins/jquery-validate/jquery.validate.css"];loadCSS(requireCSS);var requireJS=["${ctx}/assets/plugins/jquery-validate/jquery.validate.min.js","${ctx}/assets/plugins/jquery-validate/lib/jquery.metadata.min.js","${ctx}/assets/plugins/jquery-validate/lib/jquery.form.min.js","${ctx}/assets/plugins/jquery-validate/localization/messages_cn.js"];loadJS(requireJS,function(){formValidateInit()});function formValidateInit(){jQuery.metadata.setType("attr","validate");jQuery("#edit_user_form").validate()};</script><script type="text/javascript">Ext.onReady(function(){function f(){if(jQuery("#edit_user_form").valid()){var g=function(i){var h=Ext.JSON.decode(i);if(h.success==true){d()}else{Ext.MessageBox.show({title:"错误提示:",msg:h.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}};jQuery("#edit_user_form").ajaxSubmit(g)}}function e(){if(jQuery("#edit_user_form").valid()){var g=function(i){var h=Ext.JSON.decode(i);if(h.success==true){}else{Ext.MessageBox.show({title:"错误提示:",msg:h.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}Ext.getDom("name").value="";Ext.getDom("displayName").value="";Ext.getDom("password").value="";Ext.getDom("id").value="";$("#sn").val(parseInt($("#sn").val()==""?0:$("#sn").val())+1)};jQuery("#edit_user_form").ajaxSubmit(g)}}function d(){var h=Ext.getCmp("${param.popupwinid}");if(h){h.close()}else{centerPanel.closeTab(centerPanel.currentTab)}var g=Ext.getCmp("${param.parentWinGridPanelID}");if(g){g.store.load()}}var a=[{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/save_add.png",text:"保存并新增",handler:function(){e()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/saved.png",text:"保存",handler:function(){f()}},"-",{pressed:false,cls:"x-btn-text-icon",icon:ICONPATH+"button/dialog-close.png",text:"关闭",handler:function(){d()}}];var b=Ext.create("Ext.panel.Panel",{layout:"fit",items:[{title:"",bsn:false,bodyCls:"form_panel_body",autoScroll:true,contentEl:"user_form-main-content",tbar:a,anchor:"98% 98%"}]});var c=Ext.getCmp("${param.popupwinid}");if(c){c.removeAll();c.add(b)}});</script><div id="user_form-main-content" class="main_from"><form:form id="edit_user_form" modelAttribute="user" action="${pageContext.request.contextPath}/identity/user/doEditUsers" method="post" enctype="multipart/form-data"><form:hidden path="id"/><input id="dept_id" type="hidden" name="dept_id" value="${dept_id}"/><input id="dept_name" type="hidden" name="dept_name" value="${departmentName}"/><input id="role_id" type="hidden" name="role_id"/><input id="user_id" type="hidden" name="user_id" value="${user.id}"/><input id="role_name" type="hidden" name="role_name"/><div class="form_table_box" style=" margin:0 auto; width:98%;"><div class="form_table"><h2 class="form_title_head"><div class="tip"><span class="star">标注的为必填项</span></div> 编辑用户信息 </h2><table width="100%" bsn="0" cellspacing="0" cellpadding="0" class="form_table_blk_border"><tr><td class="form-TdLabel" width="15%"><span class="star">登&nbsp;&nbsp;录&nbsp;&nbsp;名: </span></td><td nowrap="nowrap" class="form-TdField"><form:input path="name" validate="{required:true,remote:{url:'${pageContext.request.contextPath}/identity/user/doValidateName',type:'post',data:{userid:function(){return jQuery('#user_id').val();}}},messages:{remote:'该用户已经存在,请输入其它值!'}}" cssStyle="width:70%"/></td></tr><tr><td class="form-TdLabel"><span class="star">显&nbsp;&nbsp;示&nbsp;&nbsp;名:</span></td><td class="form-TdField"><form:input path="displayName" validate="{required:true}" cssStyle="width:70%"/></td></tr><tr><td class="form-TdLabel"><span class="star">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span></td><td class="form-TdField"><form:password path="password" validate="{required:true}" cssStyle="width:70%"/></td></tr><tr><td class="form-TdLabel" width="15%"><span class="star">是否有效: </span></td><td nowrap="nowrap" class="form-TdField Td-NoPadding"><div id="typeDisplay" class="Td-NoPadding"></div></td></tr><jf:box name="adminType_box"><tr><td class="form-TdLabel" width="15%"><span class="star">用户类型: </span></td><td nowrap="nowrap" class="form-TdField Td-NoPadding"><div id="adminTypeDiv" class="Td-NoPadding"></div></td></tr><script type="text/javascript">Ext.require(["Ext.form.field.ComboBox","Ext.window.MessageBox","Ext.form.FieldSet","Ext.tip.QuickTipManager","Ext.ux.TreePicker","Ext.data.*"]);Ext.onReady(function(){var a=Ext.create("Ext.data.Store",{fields:["code","name"],data:[{code:"COMMON",name:"普通用户"},{code:"ORG",name:"机构管理员"},{code:"SYSTEM",name:"系统管理员"}]});Ext.create("Ext.form.field.ComboBox",{fieldLabel:"",renderTo:"adminTypeDiv",displayField:"name",valueField:"code",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",hiddenName:"adminType",value:"${user.adminType}",width:140,store:a,queryMode:"local",typeAhead:true})});</script></jf:box><tr><td class="form-TdLabel">邮件地址:</td><td class="form-TdField"><form:input path="email" validate="{email:true}" cssStyle="width:70%"/></td></tr><tr><td class="form-TdLabel">手机号码:</td><td class="form-TdField"><form:input path="mobile" validate="{isMobile:true}" cssStyle="width:70%"/></td></tr><jf:box name="orgcode_box"><tr><td class="form-TdLabel" width="15%"><span class="star">机构编码: </span></td><td nowrap="nowrap" class="form-TdField Td-NoPadding"><div id="orgcodeDisplay" class="Td-NoPadding"></div></td></tr><script type="text/javascript">Ext.require(["Ext.form.field.ComboBox","Ext.window.MessageBox","Ext.form.FieldSet","Ext.tip.QuickTipManager","Ext.ux.TreePicker","Ext.data.*"]);Ext.onReady(function(){Ext.create("Ext.form.field.ComboBox",{fieldLabel:"",renderTo:"orgcodeDisplay",displayField:"name",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",valueField:"code",hiddenName:"orgcode",value:"${user.orgcode}",typeAhead:true,width:250,onLoad:function(){this.setRawValue("${orgcodeName}")},store:Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"code",type:"string"},{name:"sn",type:"int"}],pageSize:500,proxy:{type:"jsonp",enablePaging:true,url:javafree.CONTEXTPATH+"/identity/orgcode/doGetOrgCodeGridJson",reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:true,remoteSort:true,sorters:{property:"sn",direction:"ASC"}})})});</script></jf:box><tr><td class="form-TdLabel">选择部门:</td><td nowrap="nowrap" class="form-TdField "><div id="dep_combobox_id" class="Td-NoPadding"></div></td></tr><tr><td class="form-TdLabel">选择角色:</td><td nowrap="nowrap" class="form-TdField "><div id="role_combobox_id" class="Td-NoPadding"></div></td></tr><tr><td class="form-TdLabel">序&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</td><td class="form-TdField"><form:input path="sn" validate="{digits:true}" cssStyle="width:70%"/></td></tr><tbody></table></div></div></form:form></div><script type="text/javascript">Ext.require(["Ext.form.field.ComboBox","Ext.window.MessageBox","Ext.form.FieldSet","Ext.tip.QuickTipManager","Ext.ux.TreePicker","Ext.data.*"]);Ext.onReady(function(){var a=Ext.create("Ext.data.Store",{fields:["code","name"],data:[{code:"Y",name:"是"},{code:"N",name:"否"}]});Ext.create("Ext.form.field.ComboBox",{fieldLabel:"",renderTo:"typeDisplay",displayField:"name",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",valueField:"code",hiddenName:"enabled",value:"${user.enabled}",width:140,store:a,queryMode:"local",typeAhead:true});Ext.create("Ext.ux.TreePicker",{renderTo:"dep_combobox_id",fieldLabel:"",width:250,labelWidth:10,margin:"0 0 0 0",displayField:"name",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",rootVisible:false,value:"${dept_id}",minPickerHeight:260,onUpdate:function(b,e,c,d){this.setRawValue("${departmentName}")},onItemClick:function(c,b,d,g,f){this.selectItem(b);Ext.getDom("dept_id").value=b.get("id");Ext.getDom("dept_name").value=b.get("name")},store:Ext.create("Ext.data.TreeStore",{fields:["id","name"],root:{name:"请选择所在机构",expanded:true},proxy:{type:"ajax",url:javafree.CONTEXTPATH+"/identity/department/doGetDepartmentTreeJson",reader:{type:"json"}},autoLoad:true,remoteSort:true,sorters:{property:"sn",direction:"ASC"}})});Ext.create("Ext.form.field.ComboBox",{fieldLabel:"",renderTo:"role_combobox_id",displayField:"name",fieldStyle:"border-left: 0px!important;border-top: 0px!important;border-bottom: 0px!important;",valueField:"id",width:250,store:Ext.create("Ext.data.Store",{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"note",type:"string"},{name:"createDate",type:"string"},{name:"sn",type:"int"}],pageSize:500,proxy:{type:"jsonp",enablePaging:true,url:javafree.CONTEXTPATH+"/identity/role/doGetRoleGridJson",reader:{rootProperty:"rows",totalProperty:"total"},simpleSortMode:true},autoLoad:true,remoteSort:true,sorters:{property:"sn",direction:"ASC"}}),queryParam:"query",queryMode:"remote",listeners:{select:function(){Ext.getDom("role_id").value=this.getValue();Ext.getDom("role_name").value=this.getDisplayValue()}}})});</script></body></html>