<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" %><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %><%@ page import="org.slf4j.Logger,org.slf4j.LoggerFactory" %><%@ page import="java.io.*"%><c:set var="ctx" value="${pageContext.request.contextPath}"/><% //设置返回码200，避免浏览器自带的错误页面 response.setStatus(200); //记录日志 Logger logger=LoggerFactory.getLogger("500.jsp"); logger.error(exception.getMessage(), exception); %><!DOCTYPE html><html><head><title>500 - 系统内部错误</title></head><body><script type="text/javascript" src="${ctx}/assets/ace/js/jquery-2.1.4.min.js"></script><script>function showErrorMessage(){$("#errorMessageDiv").toggle()}$(document).ready(showErrorMessage);</script><table width="100%"><tr style="border-bottom:dotted 1px Gray;"><td style="width: 50px"> &nbsp;&nbsp;&nbsp;&nbsp;<img src="${ctx}/assets/images/button/error-48.png" id="error_img"/></td><td><h2>500 - 系统发生内部错误.</h2></td><td></td></tr><tr><td style="width: 50px"></td><td><h5>如果问题重复出现，请向系统管理员反馈。</h5></td></tr><tr><td style="width: 50px"></td><td><a id="showErrorMessageButton" href="javascript:showErrorMessage();"><h6>查看详细错误信息</h6></a></td></tr></table><div id="errorMessageDiv" style=" overflow:scroll; width:90%; height:500px;"><pre>
                <%
                    try {
                        //全部内容先写到内存，然后分别从两个输出流再输出到页面和文件
                        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                        PrintStream printStream = new PrintStream(byteArrayOutputStream);
  
                        printStream.println("异常信息");
                        printStream.println(exception.getClass() + " : " + exception.getMessage());
                        printStream.println();
  
                        printStream.println("堆栈信息");
                        exception.printStackTrace(printStream);
                        printStream.println();

                        out.print(byteArrayOutputStream);    //输出到网页
                        
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                %>
            </pre></div></body></html>