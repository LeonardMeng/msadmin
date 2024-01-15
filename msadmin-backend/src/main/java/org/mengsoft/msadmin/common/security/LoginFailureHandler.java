package org.mengsoft.msadmin.common.security;

import cn.hutool.json.JSONUtil;
import org.mengsoft.msadmin.common.responseutils.ErrorResponse;
import org.mengsoft.msadmin.common.responseutils.enums.ResponseCode;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

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
public class LoginFailureHandler implements AuthenticationFailureHandler {


    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        httpServletResponse.setContentType("application/json;charset=UTF-8");
        ServletOutputStream outputStream = httpServletResponse.getOutputStream();

        String message=e.getMessage();
        if(e instanceof BadCredentialsException){
            message="用户名或者密码错误！";
        }

        outputStream.write(JSONUtil.toJsonStr(
                ErrorResponse.fail(ResponseCode.USER_NAME_OR_PASSWORD_ERROR, e))
                .getBytes("UTF-8"));
        outputStream.flush();
        outputStream.close();
    }
}
