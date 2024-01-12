package org.mengsoft.msadmin.controller;


import lombok.extern.slf4j.Slf4j;
import org.mengsoft.msadmin.entity.User;
import org.mengsoft.msadmin.service.UserService;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.annotation.Resources;
import java.util.List;

@RestController
@EnableAutoConfiguration
@Slf4j
@RequestMapping(value="/user")
public class UserController {

    @Resource
    private UserService userService;

    @RequestMapping(value="/list", method= RequestMethod.GET, produces="application/json")
    public List<User> login() {
        return userService.list();
    }

}
