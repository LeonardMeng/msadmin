package org.mengsoft.msadmin.controller;


import lombok.extern.slf4j.Slf4j;
import org.mengsoft.msadmin.common.responseutils.BusinessException;
import org.mengsoft.msadmin.common.responseutils.enums.ResponseCode;
import org.mengsoft.msadmin.common.utils.JwtUtils;
import org.mengsoft.msadmin.common.utils.StringUtil;
import org.mengsoft.msadmin.dto.UserLoginParam;
import org.mengsoft.msadmin.entity.User;
import org.mengsoft.msadmin.service.UserService;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.annotation.Resources;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@EnableAutoConfiguration
@Slf4j
@RequestMapping(value="/user")
public class UserController {

    @Resource
    private UserService userService;

    @RequestMapping(value="/list", method= RequestMethod.GET, produces="application/json")
    @PreAuthorize("hasAnyAuthority('system2:user:list')")
//    @PreAuthorize("hasRole('ROLE_common')")
    public Map<String,Object> userList(@RequestHeader(required = false) String token){
        if(StringUtil.isNotEmpty(token)){
            Map<String,Object> resutMap=new HashMap<>();
            List<User> userList = userService.list();
            resutMap.put("userList",userList);
            return resutMap;
        }

        throw new BusinessException(ResponseCode.USER_NOT_LOGIN);
    }

    @RequestMapping(value="/login", method= RequestMethod.POST, produces="application/json")
    public String login(@RequestBody UserLoginParam userLoginParam) {
        return JwtUtils.genJwtToken("java1234");
    }

}
