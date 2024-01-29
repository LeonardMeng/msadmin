package org.mengsoft.msadmin.common.security;

import cn.hutool.json.JSONUtil;
import org.apache.tomcat.jni.Global;
import org.mengsoft.msadmin.common.responseutils.BusinessException;
import org.mengsoft.msadmin.common.responseutils.ErrorResponse;
import org.mengsoft.msadmin.common.responseutils.GlobalExceptionHandler;
import org.mengsoft.msadmin.common.responseutils.enums.ResponseCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author Leonard Meng
 * @site www.menglingjun.com
 */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    private GlobalExceptionHandler exceptionHandler;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver resolver;

    @Override
    public void commence(HttpServletRequest httpServletRequest,
                         HttpServletResponse httpServletResponse,
                         AuthenticationException e) throws IOException, ServletException {
        resolver.resolveException(httpServletRequest, httpServletResponse, null, e);
//        httpServletResponse.setContentType("application/json;charset=UTF-8");
//        throw new BusinessException(ResponseCode.USER_NOT_LOGIN);
//        exceptionHandler.HandleBusinessException(new BusinessException(ResponseCode.USER_NOT_LOGIN), httpServletRequest);
//        httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//
//        httpServletResponse.getOutputStream().println("{ \"error\": \"" + e.getMessage() + "\" }");
//        httpServletResponse.getOutputStream().flush();
//        httpServletResponse.getOutputStream().close();
//

//        ServletOutputStream outputStream = httpServletResponse.getOutputStream();
//
//        outputStream.write(JSONUtil.toJsonStr( new ErrorResponse(ResponseCode.USER_NOT_LOGIN, e)).getBytes());
//        outputStream.flush();
//        outputStream.close();
    }
}
