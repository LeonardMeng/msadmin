package org.mengsoft.msadmin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.mengsoft.msadmin.entity.User;
import org.mengsoft.msadmin.service.UserService;
import org.mengsoft.msadmin.mapper.UserMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
* @author menglingjun
* @description 针对表【user】的数据库操作Service实现
* @createDate 2024-01-13 10:04:02
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{

    @Resource
    private UserMapper userMapper;

    @Override
    public User getByUsername(String username) {
        return userMapper.selectOne(new QueryWrapper<User>().eq("username",username));
    }

    @Override
    public String getUserAuthorityInfo(Long userId) {
        return null;
    }


}




