<%@ page contentType="text/html;charset=UTF-8"%><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %><c:set var="ctx" value="${pageContext.request.contextPath}"/><%response.setStatus(200);%><!DOCTYPE html><html><head><title>无此权限</title></head><body><table width="100%"><tr style="border-bottom:dotted 1px Gray;"><td style="width: 50px"> &nbsp;&nbsp;&nbsp;&nbsp;<img src="${ctx}/assets/images/button/error-48.png" id="error_img"/></td><td><h2>您无此权限.</h2></td><td></td></tr><tr><td style="width: 50px"></td><td><h5>如果问题重复出现，请向系统管理员反馈。</h5></td></tr></table></body></html>