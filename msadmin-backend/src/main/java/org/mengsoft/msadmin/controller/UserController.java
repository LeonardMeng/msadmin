package org.mengsoft.msadmin.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.mengsoft.msadmin.common.responseutils.BusinessException;
import org.mengsoft.msadmin.common.responseutils.enums.ResponseCode;
import org.mengsoft.msadmin.common.utils.JwtUtils;
import org.mengsoft.msadmin.common.utils.StringUtil;
import org.mengsoft.msadmin.dto.UserLoginParam;
import org.mengsoft.msadmin.entity.PageBean;
import org.mengsoft.msadmin.entity.Role;
import org.mengsoft.msadmin.entity.User;
import org.mengsoft.msadmin.service.RoleService;
import org.mengsoft.msadmin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private RoleService roleService;


    @RequestMapping(value="/list", method= RequestMethod.GET, produces="application/json")
    @PreAuthorize("hasAnyAuthority('system:user:list')")
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

    @RequestMapping(value="/query", method= RequestMethod.POST, produces="application/json")
    @PreAuthorize("hasAuthority('system:user:query')")
    public Map<String,Object> list(@RequestBody PageBean pageBean){
        String query=pageBean.getQuery().trim();
        Page<User> pageResult = userService.page(new Page<>(pageBean.getPageNum(), pageBean.getPageSize()),new QueryWrapper<User>().like(StringUtil.isNotEmpty(query),"username",query));
        List<User> userList = pageResult.getRecords();
        for(User user:userList){
            List<Role> roleList = roleService.list(new QueryWrapper<Role>().inSql("id", "select role_id from user_role where user_id=" + user.getId()));
            user.setRoleList(roleList);
        }
        Map<String,Object> resultMap=new HashMap<>();
        resultMap.put("userList",userList);
        resultMap.put("total",pageResult.getTotal());
        return resultMap;
    }

    @RequestMapping(value="/login", method= RequestMethod.POST, produces="application/json")
    public String login(@RequestBody UserLoginParam userLoginParam) {
        return JwtUtils.genJwtToken("java1234");
    }

}
