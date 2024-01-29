package org.mengsoft.msadmin.controller;

import lombok.extern.slf4j.Slf4j;
import org.mengsoft.msadmin.entity.User;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@EnableAutoConfiguration
@Slf4j
@RequestMapping(value="/test")
public class TestController {
    @RequestMapping(value="/hello", method= RequestMethod.GET, produces="application/json")
    public String login() {
        return "Hello World";
    }
}
