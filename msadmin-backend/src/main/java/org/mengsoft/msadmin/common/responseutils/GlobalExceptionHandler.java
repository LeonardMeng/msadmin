package org.mengsoft.msadmin.common.responseutils;


import lombok.extern.slf4j.Slf4j;
import org.mengsoft.msadmin.common.responseutils.enums.ResponseCode;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Throwable.class)
    public ErrorResponse HandleThrowable(Throwable e, HttpServletRequest request){
        ErrorResponse errorResponse = ErrorResponse.fail(ResponseCode.SYSTEM_ERROR, e);
        log.error("URL: {} Exception:", request.getRequestURI(), e );

        return errorResponse;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ErrorResponse HandleMethodArgumentNotValidException(MethodArgumentNotValidException e,
                                                               HttpServletRequest request){
        String message = this.Handle(e.getBindingResult().getFieldErrors());
        ErrorResponse errorResponse = ErrorResponse.fail(ResponseCode.PARAM_IS_INVALID, e, message);
        log.error("URL: {} Param Check Exception:", request.getRequestURI(), e );

        return errorResponse;
    }

    private String Handle(List<FieldError> fieldErrorList){
        StringBuilder sb = new StringBuilder();
        for (FieldError fieldError : fieldErrorList){
            sb.append(fieldError.getField());
            sb.append("=[");
            sb.append(fieldError.getDefaultMessage());
            sb.append("] ");

        }
        return sb.toString();

    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ErrorResponse HandleIllegalArgumentException(IllegalArgumentException e, HttpServletRequest request){
        ErrorResponse errorResponse = ErrorResponse.builder().status(4000)
                .message(e.getMessage())
                .exception(e.getClass().getName())
                .build();
        log.warn("URL: {} Assert Check Exception:", request.getRequestURI(), e );
        return errorResponse;
    }


    @ExceptionHandler(BusinessException.class)
    public ErrorResponse HandleBusinessException(BusinessException e, HttpServletRequest request){
        ErrorResponse errorResponse = ErrorResponse.builder().status(e.getStatus())
                .message(e.getMessage())
                .exception(e.getClass().getName())
                .build();
        log.warn("URL: {} Business Exception:", request.getRequestURI(), e );

        return errorResponse;
    }
}
