package org.mengsoft.msadmin.common.responseutils;

import lombok.Data;
import org.mengsoft.msadmin.common.responseutils.enums.ResponseCode;

@Data
public class BusinessException extends RuntimeException{

    private Integer status;
    private String message;

    public BusinessException(ResponseCode responseCode){
        this.status = responseCode.getCode();
        this.message = responseCode.getMessage();
    }

}
