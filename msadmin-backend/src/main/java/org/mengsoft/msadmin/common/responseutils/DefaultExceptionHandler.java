package org.mengsoft.msadmin.common.responseutils;

import org.mengsoft.msadmin.common.responseutils.enums.ResponseCode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ AuthenticationException.class })
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleAuthenticationException(Exception ex) {

//        throw new BusinessException(ResponseCode.USER_NOT_LOGIN);
        ErrorResponse re = new ErrorResponse(40001, ex.getMessage(), ex.getMessage());
        return ResponseEntity.status(HttpStatus.OK).body(re);
    }
}