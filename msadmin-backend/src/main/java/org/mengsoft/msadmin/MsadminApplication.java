package org.mengsoft.msadmin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("org.mengsoft.msadmin.mapper")
public class MsadminApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsadminApplication.class, args);
    }

}
