package org.mengsoft.msadmin.common.security;


import org.mengsoft.msadmin.common.responseutils.BusinessException;
import org.mengsoft.msadmin.common.responseutils.enums.ResponseCode;

import org.mengsoft.msadmin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 自定义UserDetails
 * @author java1234_小锋 （公众号：java1234）
 * @site www.java1234.vip
 * @company 南通小锋网络科技有限公司
 */
@Service
public class MyUserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        org.mengsoft.msadmin.entity.User user=userService.getByUsername(username);
        if(user==null){
            throw new BusinessException(ResponseCode.USER_NAME_OR_PASSWORD_ERROR);
        }else if("1".equals(user.getStatus())){
            throw new BusinessException(ResponseCode.USER_IS_BANNED);
        }
        return new User(user.getUsername(),user.getPassword(),getUserAuthority(user.getId()));
    }

    public List<GrantedAuthority> getUserAuthority(Long userId) {
        //  格式ROLE_admin,ROLE_common,system:user:resetPwd,system:role:delete,system:user:list,system:menu:query,system:menu:list,system:menu:add,system:user:delete,system:role:list,system:role:menu,system:user:edit,system:user:query,system:role:edit,system:user:add,system:user:role,system:menu:delete,system:role:add,system:role:query,system:menu:edit
        String authority=userService.getUserAuthorityInfo(userId);
        return AuthorityUtils.commaSeparatedStringToAuthorityList(authority);
    }
}
