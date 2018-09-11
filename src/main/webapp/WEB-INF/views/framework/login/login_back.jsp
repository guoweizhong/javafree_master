<%@ page contentType="text/html;charset=UTF-8"%><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %><c:set var="ctx" value="${pageContext.request.contextPath}"/><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><title>统一待办工作提醒-登录页</title><link href="${ctx}/assets/images/favicon.ico" type="image/x-icon" rel="shortcut icon"><link rel="stylesheet" href="${ctx}/assets/login/css/supersized.css"><link rel="stylesheet" href="${ctx}/assets/login/css/main.css"><script src="${ctx}/assets/login/js/jquery.min.js"></script><script src="${ctx}/assets/login/js/supersized.3.2.7.min.js"></script><script type="text/javascript">jQuery(function(a){a.supersized({slide_interval:4000,transition:1,transition_speed:1000,performance:1,min_width:0,min_height:0,vertical_center:1,horizontal_center:1,fit_always:0,fit_portrait:1,fit_landscape:0,slide_links:"blank",slides:[{image:"${ctx}/assets/login/images/1.jpg"},{image:"${ctx}/assets/login/images/2.jpg"},{image:"${ctx}/assets/login/images/3.jpg"},{image:"${ctx}/assets/login/images/4.jpg"},{image:"${ctx}/assets/login/images/5.jpg"},{image:"${ctx}/assets/login/images/6.jpg"}]})});</script><script src="${ctx}/assets/login/js/custominput.js"></script></head><body><div class="login_blk"><div class="shadow"></div><div class="login_head"><img src="${ctx}/assets/login/images/login_logo.png"></div><form action="${ctx}/submitLogin" method="post" name="loginform" id="loginform" onkeydown="if(event.keyCode==13){DoSubmit();}"><dl class="login_form"><dt><input type="button" class="login_btn" value="登录" id="submit_btn"></dt><dd><ul class="login_input"><li><span><i><img src="${ctx}/assets/login/images/user.png"></i><c:choose><c:when test="${not empty relogin_username}"><input name="j_username" id="j_username" tabindex="0" onfocus="if (this.value == '请输入用户名') {this.value = '';}" onblur="if (this.value == '') {this.value = '请输入用户名';}" type="text" value="${relogin_username}"/></c:when><c:otherwise><input name="j_username" id="j_username" tabindex="0" onfocus="if (this.value == '请输入用户名') {this.value = '';}" onblur="if (this.value == '') {this.value = '请输入用户名';}" type="text" value="请输入用户名"/></c:otherwise></c:choose><c:remove var="relogin_username"/></span></li><li><span><i><img src="${ctx}/assets/login/images/password.png"></i><input name="j_password" id="j_password" type="password" onfocus="if (this.value == '请输入密码') {this.value = '';}" onblur="if (this.value == '') {this.value = '请输入密码';}"></span></li></ul><div class="auto_login"><input type="checkbox" value="Y" name="rememberMe" id="rememberMe"/><label for="rememberMe" id="checkbox_btn">自动登录</label><div class="msg-wrap"><div id="lg_msg" class="msg-warn hide" style="display: none;"><b></b>公共场所不建议自动登录，以防账号丢失</div><div id="lg_warn" class="msg-error hide" style="display: none;"><b></b>用户名或密码不能为空</div><c:if test="${not empty errors}"><div id="lg_error" class="msg-error"><b></b><c:forEach var="error" items="${errors}" varStatus="error_index"><c:choose><c:when test="${error_index.last}"><c:out value="${error}"/></c:when></c:choose></c:forEach></div><c:remove var="errors"/></c:if></div></div></dd></dl></form><div class="login_bottom">© 1998-2016 中国石油大连石化公司 版权所有</div></div></body><script language="javascript" type="text/javascript">$(function(){$(window).resize()});$(window).resize(function(){$(".login_blk").css({position:"absolute",left:($(window).width()-$(".login_blk").outerWidth())/2,top:($(window).height()-$(".login_blk").outerHeight())/2})});var input=$("input").customInput();$(function(){$(".toggle").each(function(){$("div:first",this).addClass("first");$("div:last",this).addClass("last")})});$("#checkbox_btn").bind("click",function(){if(!input.is(":checked")){$("#lg_warn").hide();$("#lg_error").hide();$("#lg_msg").show()}else{$("#lg_msg").hide()}});$("#submit_btn").bind("click",function(){var a=document.getElementById("j_username");var b=document.getElementById("j_password");if((a!=null&&(a.value==null||a.value==""))||(b!=null&&(b.value==null||b.value==""))){$("#lg_warn").show();$("#lg_error").hide();$("#lg_msg").hide();return false}else{$("#lg_warn").hide();$("#lg_error").hide();$("#lg_msg").hide();document.forms[0].submit()}});</script></html>