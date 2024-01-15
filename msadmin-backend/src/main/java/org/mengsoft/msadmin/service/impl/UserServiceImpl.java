package org.mengsoft.msadmin.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.mengsoft.msadmin.common.utils.StringUtil;
import org.mengsoft.msadmin.entity.Menu;
import org.mengsoft.msadmin.entity.Role;
import org.mengsoft.msadmin.entity.User;
import org.mengsoft.msadmin.mapper.MenuMapper;
import org.mengsoft.msadmin.mapper.RoleMapper;
import org.mengsoft.msadmin.service.UserService;
import org.mengsoft.msadmin.mapper.UserMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

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
    @Resource
    private RoleMapper roleMapper;

    @Resource
    private MenuMapper menuMapper;
    @Override
    public User getByUsername(String username) {
        return userMapper.selectOne(new QueryWrapper<User>().eq("username",username));
    }

    @Override
    public String getUserAuthorityInfo(Long userId) {
        StringBuffer authority=new StringBuffer();
        // 根据用户id获取所有的角色信息
        List<Role> roleList = roleMapper.selectList(new QueryWrapper<Role>().inSql("id", "SELECT role_id FROM user_role WHERE user_id=" + userId));
        if(roleList.size()>0){
            String roleCodeStrs = roleList.stream().map(r -> "ROLE_" + r.getCode()).collect(Collectors.joining(","));
            authority.append(roleCodeStrs);
        }
        // 遍历所有的角色，获取所有菜单权限 而且不重复
        Set<String> menuCodeSet=new HashSet<>();
        for(Role role:roleList){
            List<Menu> menuList = menuMapper.selectList(new QueryWrapper<Menu>().inSql("id", "SELECT menu_id FROM role_menu WHERE role_id=" + role.getId()));
            for(Menu menu:menuList){
                String perms=menu.getPerms();
                if(StringUtil.isNotEmpty(perms)){
                    menuCodeSet.add(perms);
                }
            }
        }
        if(menuCodeSet.size()>0){
            authority.append(",");
            String menuCodeStrs = menuCodeSet.stream().collect(Collectors.joining(","));
            authority.append(menuCodeStrs);
        }
        System.out.println("authority:"+authority.toString());
        return authority.toString();
    }


}




