<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true"%><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><c:set var="ctx" value="${pageContext.request.contextPath}"/><% //设置返回码200，避免浏览器自带的错误页面 response.setStatus(200); %><!DOCTYPE html><html><head><title>500 - 系统内部错误</title></head><body><script type="text/javascript" src="${ctx}/assets/ace/js/jquery-2.1.4.min.js"></script><script>function showErrorMessage(){$("#errorMessageDiv").toggle()}$(document).ready(showErrorMessage);</script><table width="100%"><tr style="border-bottom:dotted 1px Gray;"><td style="width: 50px">&nbsp;&nbsp;&nbsp;&nbsp;<img src="${ctx}/assets/images/button/error-48.png" id="error_img"/></td><td><h2>500 - 系统发生内部错误.</h2></td><td></td></tr><tr><td style="width: 50px"></td><td><h5>如果问题重复出现，请向系统管理员反馈。</h5></td></tr><tr><td style="width: 50px"></td><td><a id="showErrorMessageButton" href="javascript:showErrorMessage();"><h6>查看详细错误信息</h6></a></td></tr></table><div id="errorMessageDiv" style=" overflow:scroll; width:90%; height:500px;"><pre>
                <c:if test="${not empty errors}">                         	 
                    <c:forEach var="error" items="${errors}" varStatus="error_index">
                      <c:out value="${error}" />
					</c:forEach> 
        		<c:remove var="errors" />
                </c:if>
        </pre></div></body></html>