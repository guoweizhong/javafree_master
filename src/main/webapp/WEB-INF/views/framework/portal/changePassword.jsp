<%@ page contentType="text/html; charset=UTF-8"%><%@ include file="/WEB-INF/views/framework/common/taglibs.jsp"%><link href="${pageContext.request.contextPath}/static/framework/portal/usercenter.css" rel="stylesheet"/><script src="${pageContext.request.contextPath}/assets/ace/js/jquery-2.1.4.min.js"></script><script src="${pageContext.request.contextPath}/static/framework/portal/digitalspaghetti.password.js"></script><jsp:include page="/WEB-INF/views/framework/common/form_js_css.jsp" flush="true"/><script type="text/javascript">if(!("Ext" in window)){window.Ext=parent.window.Ext}jQuery().ready(function(){$("#password_form").validate({rules:{oldpassword:{required:true,minlength:1},newpassword:{required:true,minlength:6},confirm_password:{required:true,equalTo:"#newpassword"},},messages:{oldpassword:{required:"请输入原来密码",minlength:"密码不能为空"},newpassword:{required:"请输入新密码",minlength:"密码长度至少6位以上"},confirm_password:{required:"请输入确认密码",minlength:"密码长度至少6位以上",equalTo:"确认密码要与前面密码保持一致"}}})});function doSubmit(){if(jQuery("#password_form").valid()){var a=function(c){var b=Ext.JSON.decode(c);if(b.success==true){Ext.MessageBox.alert({title:"提示信息:",msg:b.info,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO})}else{Ext.MessageBox.show({title:"错误提示:",msg:b.error,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR})}};jQuery("#password_form").ajaxSubmit(a)}}$(document).ready(function(){$("#newpassword").pstrength()});</script><div id="user_pw" class="usercenter"><form:form id="password_form" action="${pageContext.request.contextPath}/userportal/doChangeUserPassword" method="post" enctype="multipart/form-data"><div class="General clearfix"><div class="form_title">修改密码</div><dl class="General_dl clearfix"><dt>请输入原有密码：</dt><dd><div><input type="password" class="inp_normal" id="oldpassword" name="oldpassword"/></div></dd></dl><dl class="General_dl clearfix"><dt>请输入您的新密码：</dt><dd><div><input type="password" class="inp_normal" id="newpassword" name="newpassword"/></div></dd></dl><dl class="General_dl clearfix"><dt>再输入一次：</dt><dd><div><input type="password" name="confirm_password" class="inp_normal"/></div></dd></dl><dl class="General_dl clearfix no_boder"><dt></dt><dd><a href="#" class="blue_btn" onClick="doSubmit();"><span>保存修改</span></a></dd></dl></div></form:form></div>