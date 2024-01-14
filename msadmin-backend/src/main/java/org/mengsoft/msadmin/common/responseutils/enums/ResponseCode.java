package org.mengsoft.msadmin.common.responseutils.enums;



public enum ResponseCode {

    SUCCESS(200, "Success"),
    PERMISSION_DENIED(403, "Forbidden"),

    USER_NOT_LOGIN(20000, "User is not login!"),
    USER_NOT_EXSITED(20001, "User is not exsited!"),
    USER_NAME_OR_PASSWORD_ERROR(20002, "User name or password is not correct!"),
    EMAIL_HAS_EXSITED(20003, "Email is already exsited!"),
    USER_IS_BANNED(20004, "User is banned!"),
    PARAM_IS_INVALID(30002, "Param is invalid."),
    TOKEN_IS_REQUIRED(40001, "Token is required."),
    TOKEN_IS_EXPIRED(40002, "Token is expired."),
    TOKEN_CHECK_FAILED(40002, "Token check failed."),



    SYSTEM_ERROR(10000, "System Error, Please Contact Admin.");


    private Integer code;
    private String message;

    ResponseCode(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
