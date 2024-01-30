package org.mengsoft.msadmin.common.security;

import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import org.mengsoft.msadmin.common.responseutils.BusinessException;
import org.mengsoft.msadmin.common.responseutils.enums.ResponseCode;
import org.mengsoft.msadmin.common.utils.JwtUtils;
import org.mengsoft.msadmin.entity.Menu;
import org.mengsoft.msadmin.entity.Role;
import org.mengsoft.msadmin.entity.User;
import org.mengsoft.msadmin.service.MenuService;
import org.mengsoft.msadmin.service.RoleService;
import org.mengsoft.msadmin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

/**
 *
 * @author Leonard Meng
 * @site www.menglingjun.com
 */
@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private MenuService menuService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Authentication authentication) throws IOException, ServletException {
        httpServletResponse.setContentType("application/json;charset=UTF-8");
        ServletOutputStream outputStream = httpServletResponse.getOutputStream();

        String username=authentication.getName();
        String token = JwtUtils.genJwtToken(username);

        User currentUser = userService.getByUsername(username);
        if(currentUser == null)
            throw new BusinessException(ResponseCode.USER_NAME_OR_PASSWORD_ERROR);
        // 根据用户id获取所有的角色信息
        List<Role> roleList = roleService.list(new QueryWrapper<Role>().inSql("id", "SELECT role_id FROM user_role WHERE user_id=" + currentUser.getId()));

        // 遍历所有的角色，获取所有菜单权限 而且不重复
        Set<Menu> menuSet=new HashSet<>();
        for(Role sysRole:roleList){
            List<Menu> menuList = menuService.list(new QueryWrapper<Menu>().inSql("id", "SELECT menu_id FROM role_menu WHERE role_id=" + sysRole.getId()));
            for(Menu menu:menuList){
                menuSet.add(menu);
            }
        }

        currentUser.setRoles(roleList.stream().map(Role::getName).collect(Collectors.joining(",")));
        currentUser.setPassword("");
        List<Menu> sysMenuList=new ArrayList<>(menuSet);

        // 排序
        sysMenuList.sort(Comparator.comparing(Menu::getOrderNum));

        // 转菜单树
        List<Menu> menuList=menuService.buildTreeMenu(sysMenuList);

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("status", 200);
        resultMap.put("token", token);
        resultMap.put("currentUser", currentUser);
        resultMap.put("menuList", menuList);

//        outputStream.write(JSONUtil.toJsonStr(R.ok("登录成功").put("authorization",token).put("currentUser",currentUser).put("menuList",menuList)).
        outputStream.write(JSONUtil.toJsonStr(resultMap).getBytes());
        outputStream.flush();
        outputStream.close();
    }
}
